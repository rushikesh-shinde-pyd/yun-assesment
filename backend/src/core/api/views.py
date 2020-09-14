from django.shortcuts import get_object_or_404
from rest_framework import generics
from core import models
from . import serializers


class ItemList(generics.ListAPIView):
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer


class ItemDetail(generics.RetrieveAPIView):
    queryset = models.Item.objects.all()
    serializer_class = serializers.ItemSerializer
    lookup_fields = ('name',)

    def get_object(self):
        queryset = self.get_queryset()
        filter = {}
        for field in self.lookup_fields:
            filter[field] = self.kwargs[field]

        obj = get_object_or_404(queryset, **filter)
        self.check_object_permissions(self.request, obj)
        print("Printing selected Item: ", obj.name)
        return obj
