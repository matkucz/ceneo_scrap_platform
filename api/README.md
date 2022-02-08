# Ceneo Scrapper
Django backend with Celery scrapping tasks. 
### Note: This is example project for learning purposes. Instead of scrapping data you should use Ceneo API.
## How to run project?
### Install dependencies
```
pip install -r requirements.txt
```
### Set env varaibles:
For example on Linux:
```
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=db
export DB_USER=dbuser
export DB_PASSWORD=dbpassword
export SECRET_KEY='super-secret-django-key'
export REDIS_PORT=6379
export REDIS_HOST=localhost
```
### Make migrations
```
python manage.py migrate
```
### Run server
```
python manage.py runserver
```
### Run celery
```
celery -A scrapeapp worker -P threads -l INFO
```