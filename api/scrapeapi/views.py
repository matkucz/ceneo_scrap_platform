from django.http import Http404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from scrapeapi.serializer import (
    CollectionSerializer,
    ProductSerializer,
    RegisterSerializer,
)
from scrapeapi.models import Collection, Product
from scrapeapi.tasks import scrap_data_from_website


class RegisterView(APIView):
    """
    API endpoint that allows to create users accounts.
    """
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                data=serializer.data,
                status=status.HTTP_201_CREATED
            )
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CollectionView(APIView):
    """
    API endpoint to work with `Collection` model (get, update or delete).
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        """
        Get `Collection` object with given id.
        """
        try:
            return Collection.objects.get(id=id, deleted=False)
        except Collection.DoesNotExist:
            raise Http404

    def get(self, request, id):
        """
        Return `Collection` instance with given id.
        """
        collection = self.get_object(id)
        serializer = CollectionSerializer(collection)
        return Response(serializer.data)

    def put(self, request, id):
        """
        Edit and return existing `Collection` instance.
        """
        collection = self.get_object(id)
        serializer = CollectionSerializer(collection, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        """
        Delete existing `Collection` instance.
        """
        collection = self.get_object(id)
        collection.deleted = True
        collection.save()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CollectionListView(APIView):
    """
    API endpoint to get list of `Collection`, or create new one.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Get list of `Collection` instances.
        """
        collections = Collection.objects.filter(deleted=False)
        serializer = CollectionSerializer(collections, many=True)
        return Response(serializer.data)

    def post(self, request):
        """
        Create and return new `Collection` instance.
        """
        data = request.data
        data["created_by"] = request.user.id
        serializer = CollectionSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductView(APIView):
    """
    API endpoint to work with `Product` model (get, update or delete).
    """
    permission_classes = [IsAuthenticated]

    def get_object(self, id):
        """
        Get `Product` object with given id.
        """
        try:
            return Product.objects.get(id=id, deleted=False)
        except Product.DoesNotExist:
            raise Http404

    def get(self, request, collection_id, id):
        """
        Return `Product` instance with given id.
        """
        product = self.get_object(id)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def put(self, request, collection_id, id):
        """
        Edit and return existing `Product` instance.
        """
        product = self.get_object(id)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, collection_id, id):
        """
        Delete existing `Product` instance.
        """
        pass


class ProductListView(APIView):
    """
    API endpoint to get list of `Product` instances, or create new one.
    """

    def get(self, request, collection_id):
        """
        Get list of `Product` instances.
        """
        products = Product.objects.filter(
            deleted=False,
            collection=collection_id
        )
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    def post(self, request, collection_id):
        """
        Create and return new `Product` instance.
        """
        data = request.data
        data["created_by"] = request.user.id
        data["collection"] = collection_id
        serializer = ProductSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            scrap_data_from_website.delay(
                serializer.data["address"], serializer.data["id"]
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
