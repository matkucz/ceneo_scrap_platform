#!/bin/sh
python scrapeapi/manage.py migrate
python scrapeapi/manage.py runserver 0.0.0.0:8000