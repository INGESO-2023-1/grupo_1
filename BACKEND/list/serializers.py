from rest_framework import serializers
from list.models import Item



class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'