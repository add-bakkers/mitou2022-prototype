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
from rest_framework import generics
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.exceptions import ParseError
from django.http import HttpResponse, JsonResponse

from api.serializers import UserSerializer, Tag1Serializer,Tag2Serializer,SensorSerializer,SensorTypeSerializer,DataSerializer,AnalysisSerializer
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
