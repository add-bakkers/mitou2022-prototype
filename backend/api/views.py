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
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

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

class DataUpload(generics.GenericAPIView):
    def post(self, request, *args, **kwargs):
        params=["user","title","description","tag1","tag2","sensor","sensor_type"]
        dataset = {}
        for param in params:
            try:
                dataset[param]=request.POST[param]
            except:
                # if param=="user":
                #     return Http404
                dataset[param]=""

        Tag1.objects.get_or_create(defaults=None, name=dataset["tag1"])
        Tag2.objects.get_or_create(defaults=None, name=dataset["tag2"])
        Sensor.objects.get_or_create(defaults=None, name=dataset["sensor"])
        SensorType.objects.get_or_create(defaults=None, name=dataset["sensor_type"])

        obj = Data(
            user=User.objects.get(id=1),
            title=dataset["title"],
            description=dataset["description"],
            tag1=Tag1.objects.get(name=dataset["tag1"]),
            tag2=Tag2.objects.get(name=dataset["tag2"]),
            sensor=Sensor.objects.get(name=dataset["sensor"]),
            sensor_type=SensorType.objects.get(name=dataset["sensor_type"])
            )
        obj.save()
        return JsonResponse({}, status=status.HTTP_201_CREATED)
        
        

class AnalysisList(generics.ListCreateAPIView):
    queryset = Analysis.objects.all()
    serializer_class = AnalysisSerializer

class FileList(generics.ListCreateAPIView):
    queryset = File.objects.all()
    serializer_class = AnalysisSerializer

class UploadFile(generics.GenericAPIView):
    queryset = File.objects.all()
    parser_classes = [FormParser, MultiPartParser]

    def post(self, request, *args, **kwargs):
        try:
            file = request.data['file']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        return JsonResponse({}, status=status.HTTP_201_CREATED)

class FileViewSet(viewsets.ModelViewSet):
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser,)
    queryset=File.objects.all()

    def perform_create(self, serializer):
        print(self.request.data)
        serializer.save(data=Data.objects.latest('created_at'),
                   file=self.request.data.get('file'))