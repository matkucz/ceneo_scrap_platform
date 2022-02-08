import scrapy

class CeneoSpider(scrapy.Spider):
    """
    Ceneo scrapy Spider.
    """
    name = 'auctions'

    def __init__(self, url=None, *args, **kwargs):
        super(CeneoSpider, self).__init__(*args, **kwargs)
        self.start_urls = [url]

    def parse(self, response):
        for auction in response.css('div.product-offer__container'):
            try:
                price = auction.attrib['data-price']
            except KeyError as e:
                value = auction.css('span.value::text').get().replace(" ", "")
                penny = auction.css('span.penny::text').get().replace(",", ".")
                price = value + penny
            shop = auction.attrib['data-shopurl']
            yield {
                'price': price,
                'shop': shop
            }
        more_auctions = response.css('a.js_remainingTrigger')
        if more_auctions:
            yield response.follow('https://www.ceneo.pl{}'.format(more_auctions.attrib['href']), self.parse)
