from rest_framework import viewsets, permissions
from list.models import Item
from list.serializers import ListSerializer


class ListViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ListSerializer