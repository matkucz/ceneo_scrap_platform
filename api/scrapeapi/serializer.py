from django.contrib.auth.models import User
from rest_framework import serializers
from scrapeapi.models import Product, Collection


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
            'first_name',
            'last_name',
        ]
        extra_kwargs = {
            'password': {
                'write_only': True
            },
        }
    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Collection
        fields = [
            'id',
            'created',
            'created_by',
            'deleted',
            'description',
            'title',
        ]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'