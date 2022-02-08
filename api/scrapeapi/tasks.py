from multiprocessing import Process, Pipe
from multiprocessing.connection import Connection
from celery.utils.log import get_task_logger
from scrapy import signals
from scrapy.crawler import Crawler
from twisted.internet import reactor
from scrapeapi.models import Product
from scrapeapi.serializer import ProductSerializer
from scrapeapi.spider import CeneoSpider
from scrapeapp.celery import app

logger = get_task_logger(__name__)

def run_scrapy(url: str, connection: Connection):
    """
    Run scrapy Crawler in background and 
    return sorted data through connection. 
    """
    output = []
    # Create a Crawler
    crawler = Crawler(CeneoSpider)
    def spider_results(signal, sender, item, response, spider):
        output.append(item)
    # close spider when job is done
    crawler.signals.connect(reactor.stop, signal=signals.spider_closed)
    # get spider results
    crawler.signals.connect(spider_results, signal=signals.item_scraped)

    # extra args to spider
    extra_spider_args = {
        "url": url
    }

    # start crawling
    crawler.crawl(**extra_spider_args)

    # this is blocking process
    reactor.run()
    # sort scraped data
    output_sorted = sorted(output, key=lambda item: float(item["price"]))
    # send data to parent connection
    connection.send(output_sorted)
    connection.close()


def update_product_fields(product_id: int, shops_list: list):
    """
    Update and save `Product` fields in database.
    """
    # get min_price
    logger.info(f"Product id={product_id} update started.")
    errors = None
    product = Product.objects.get(id=product_id, deleted=False)
    min_price = product.min_price
    min_price_shop = product.min_price_shop
    max_price = product.max_price
    max_price_shop = product.max_price_shop
    shop_price = product.shop_price
    # get min and max price and shops from scraped data
    try:
        min_price = float(shops_list[0]["price"])
        max_price = float(shops_list[-1]["price"])
        min_price_shop = shops_list[0]["shop"]
        max_price_shop = shops_list[-1]["shop"]
    except IndexError:
        errors = "Empty output. Check auction address."

    # find first occurance of item or get empty dict
    try:
        shop_in_results = next(
            (
                item 
                for item in shops_list 
                if item["shop"] == product.shop_name
            ),
            {}
        )
        shop_price = float(shop_in_results["price"])
    except KeyError:
        if product.shop_name:
            errors = "No such shop name in results."

    data = {
        "address": product.address,
        "collection": product.collection.id,
        "created_by": product.created_by.id,
        "errors": errors,
        "max_price": max_price,
        "max_price_shop": max_price_shop,
        "min_price": min_price,
        "min_price_shop": min_price_shop,
        "price": product.price,
        "shop_price": shop_price,
    }
    serializer = ProductSerializer(product, data=data)
    if serializer.is_valid():
        serializer.save()
        logger.info(f"Product id={product_id} saved.")
    logger.error(serializer.errors)


@app.task(name="scrap_data_from_website")
def scrap_data_from_website(url: str, product_id: int):
    """
    Scrap data from Ceneo website in Celery task.
    """
    logger.info(f"Scrapping from {url} started")
    parent_conn, child_conn = Pipe()
    p = Process(target=run_scrapy, args=[url, child_conn])
    p.start()
    scrapy_output = parent_conn.recv()
    parent_conn.close()
    p.join()
    logger.info("Scrapping ended.")
    update_product_fields(product_id, scrapy_output)