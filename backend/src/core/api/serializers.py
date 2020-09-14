from rest_framework import serializers
from core import models


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Item 
        fields = ('id', 'name',)