from rest_framework import serializers
from api.models import  User,Tag1,Tag2,Sensor,SensorType,Data,File,Analysis

class UserSerializer(serializers.HyperlinkedModelSerializer):

    data_user = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = User

        fields = ['url', 'id', 'name', 'data_user']

class Tag1Serializer(serializers.HyperlinkedModelSerializer):

    data_tag1 = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = Tag1

        fields = ['url', 'id', 'name', 'data_tag1']

class Tag2Serializer(serializers.HyperlinkedModelSerializer):

    data_tag2 = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = Tag2

        fields = ['url', 'id', 'name', 'data_tag2']

class SensorSerializer(serializers.HyperlinkedModelSerializer):

    data_sensor = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = Sensor

        fields = ['url', 'id', 'name', 'data_sensor']

class SensorTypeSerializer(serializers.HyperlinkedModelSerializer):

    data_sensor_type = serializers.HyperlinkedRelatedField(view_name='data-detail', many=True, read_only=True)
    
    class Meta:
        model = SensorType

        fields = ['url', 'id', 'name', 'data_sensor_type']

class DataSerializer(serializers.HyperlinkedModelSerializer):

    file = serializers.HyperlinkedRelatedField(view_name='file-detail', many=True, read_only=True)
    analysis = serializers.HyperlinkedRelatedField(view_name='analysis-detail', many=True, read_only=True)

    class Meta:
        model = Data

        fields = ['url', 'id', 'title', 'description', 'user', 'tag1', 'tag2', 'sensor', 'sensor_type', 'file', 'analysis', 'created_at']

class AnalysisSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Analysis

        fields = ['url', 'id', 'name', 'data', 'method', 'result']

class FileSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = File

        fields = ['url', 'id', 'data', 'file']