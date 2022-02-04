from django.db import models
from django.contrib.auth.models import User

class Collection(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False
    )
    deleted = models.BooleanField(null=False, default=False)
    description = models.CharField(
        max_length=100, blank=True, null=False, default=''
    )
    title = models.CharField(
        max_length=100, blank=True, null=False, default=''
    )


class Product(models.Model):
    address = models.URLField()
    collection = models.ForeignKey(
        Collection, on_delete=models.CASCADE, null=False
    )
    created = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        User, on_delete=models.CASCADE, null=False
    )
    deleted = models.BooleanField(null=False, default=False)
    description = models.CharField(
        max_length=100, blank=True, null=False, default=''
    )
    min_price = models.FloatField(null=False)
    max_price = models.FloatField(null=False)
    name = models.CharField(
        max_length=100, blank=True, null=False, default=''
    )
    price = models.FloatField(null=False)
    shop_name = models.CharField(
        max_length=100, blank=True, null=False, default=''
    )
    shop_price = models.FloatField(null=False)