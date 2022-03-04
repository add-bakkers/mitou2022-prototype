from rest_framework import serializers
from api.models import  User,Tag1,Tag2,Sensor,SensorType,Data,File,Analysis

class UserSerializer(serializers.HyperlinkedModelSerializer):

    data = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = User

        fields = ['url', 'id', 'name', 'data']

class Tag1Serializer(serializers.HyperlinkedModelSerializer):

    data = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = Tag1

        fields = ['url', 'id', 'name', 'data']

class Tag2Serializer(serializers.HyperlinkedModelSerializer):

    data = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = Tag2

        fields = ['url', 'id', 'name', 'data']

class SensorSerializer(serializers.HyperlinkedModelSerializer):

    data = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = Sensor

        fields = ['url', 'id', 'name', 'data']

class SensorTypeSerializer(serializers.HyperlinkedModelSerializer):

    data = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = SensorType

        fields = ['url', 'id', 'name', 'data']

class DataSerializer(serializers.HyperlinkedModelSerializer):

    file = serializers.HyperlinkedRelatedField(view_name='file-detail', many=True, read_only=True)
    analysis = serializers.HyperlinkedRelatedField(view_name='analysis-detail', many=True, read_only=True)

    class Meta:
        model = Data

        fields = ['url', 'id', 'title', 'description', 'user', 'tag1', 'tag2', 'sensor', 'sensor_type', 'file', 'analysis']

class AnalysisSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Analysis

        fields = ['url', 'id', 'name', 'data', 'method', 'result']