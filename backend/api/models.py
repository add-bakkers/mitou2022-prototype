from django.db import models
from datetime import date
from django.utils import timezone

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        ordering = ["name"]

class Tag1(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        ordering = ["name"]

class Tag2(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        ordering = ["name"]

class Sensor(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        ordering = ["name"]

class SensorType(models.Model):
    name = models.CharField(max_length=30)
    
    class Meta:
        ordering = ["name"]

class Data(models.Model):
    title = models.CharField(max_length=30)
    description = models.TextField(default="")
    user = models.ForeignKey(User, related_name='data_user', on_delete=models.CASCADE)
    tag1 = models.ForeignKey(Tag1, related_name='data_tag1', on_delete=models.CASCADE)
    tag2 = models.ForeignKey(Tag2, related_name='data_tag2', on_delete=models.CASCADE)
    sensor = models.ForeignKey(Sensor, related_name='data_sensor', on_delete=models.CASCADE)
    sensor_type = models.ForeignKey(SensorType, related_name='data_sensor_type', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["title"]

class File(models.Model):
    file = models.FileField(upload_to='file/%Y/%m/%d')
    data = models.ForeignKey(Data, related_name='file', on_delete=models.CASCADE)

    class Meta:
        ordering = ["data"]

class Analysis(models.Model):
    data = models.ForeignKey(Data, related_name='analysis', on_delete=models.CASCADE)
    result = models.FloatField()

    class Meta:
        ordering = ["data"]
