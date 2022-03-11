from pdb import post_mortem
from tkinter.tix import Tree
from urllib import response
from rest_framework import renderers
from api.models import  User,Tag1,Tag2,Sensor,SensorType,Data,File,Analysis
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from api import serializers
from django.views import generic
from rest_framework import generics, viewsets
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.exceptions import ParseError
from django.http import HttpResponse, JsonResponse
import numpy as np
from django.shortcuts import render, get_object_or_404
from .models import File
from api.serializers import UserSerializer, Tag1Serializer,Tag2Serializer,SensorSerializer,SensorTypeSerializer,DataSerializer,AnalysisSerializer,FileSerializer
# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class Tag1List(generics.ListCreateAPIView):
    queryset = Tag1.objects.all()
    serializer_class = Tag1Serializer

class Tag2List(generics.ListCreateAPIView):
    queryset = Tag2.objects.all()
    serializer_class = Tag2Serializer

class SensorList(generics.ListCreateAPIView):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer

class SensorTypeList(generics.ListCreateAPIView):
    queryset = SensorType.objects.all()
    serializer_class = SensorTypeSerializer

class DataList(generics.ListCreateAPIView):
    queryset = Data.objects.all()
    serializer_class = DataSerializer

class DataUpload(APIView):
    def post(self, request, *args, **kwargs):
        dataset=request.data
        with open('text.txt', mode='a') as f:
            f.write(str(dataset))
        params=['user','title','description','tag1','tag2','sensor','sensor_type']
        for param in params:
            try:
                with open('text.txt', mode='a') as f:
                    f.write(param+'\n')
                    f.write(dataset[param]+'\n')
            except:
                # if param=='user':
                #     return Http404
                dataset[param]=''

        Tag1.objects.get_or_create(defaults=None, name=dataset['tag1'])
        Tag2.objects.get_or_create(defaults=None, name=dataset['tag2'])
        Sensor.objects.get_or_create(defaults=None, name=dataset['sensor'])
        SensorType.objects.get_or_create(defaults=None, name=dataset['sensor_type'])

        obj = Data(
            user=User.objects.get(id=1),
            title=dataset['title'],
            description=dataset['description'],
            tag1=Tag1.objects.get(name=dataset['tag1']),
            tag2=Tag2.objects.get(name=dataset['tag2']),
            sensor=Sensor.objects.get(name=dataset['sensor']),
            sensor_type=SensorType.objects.get(name=dataset['sensor_type'])
            )
        obj.save()
        
        return JsonResponse({}, status=status.HTTP_201_CREATED)
        
        

class AnalysisList(generics.ListCreateAPIView):
    queryset = Analysis.objects.all()
    serializer_class = AnalysisSerializer

class FileList(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = FileSerializer


class FileUpload(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        try:
            obj = File(
                file = request.data['file'],
                data = Data.objects.latest('created_at')
                )
            obj.save()
        except KeyError:
            raise ParseError('Request has no resource file attached')
        return JsonResponse({}, status=status.HTTP_201_CREATED)

class Analyse(APIView):
    def post(self, request, *args, **kwargs):
        dataset=request.data
        
        file_value = get_object_or_404(File, id=dataset['id'])
        dat = np.loadtxt(file_value, delimiter=',',dtype='float')
        ret = np.mean(dat)

        obj = Analysis(
            data = Data.objects.get(id=dataset['id']),
            result = ret
        )
        obj.save()