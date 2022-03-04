from django.contrib import admin
from .models import User,Tag1,Tag2,Sensor,SensorType,Data,File,Analysis
# Register your models here.


admin.site.register(User)
admin.site.register(Tag1)
admin.site.register(Tag2)
admin.site.register(Sensor)
admin.site.register(SensorType)
admin.site.register(Data)
admin.site.register(File)
admin.site.register(Analysis)