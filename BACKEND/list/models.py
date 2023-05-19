from django.db import models



# Create your models here.
class Item(models.Model):
    item = models.CharField('item', max_length=150)

    def __str__(self):
        return self.item