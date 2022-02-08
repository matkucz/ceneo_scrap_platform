import os
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'scrapeapp.settings')
app = Celery('scrapeapp')

app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

@app.task
def debug_task(self):
    print(f'Request: {self.request}')
