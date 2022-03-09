from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from api import views
from rest_framework.routers import DefaultRouter
from django.contrib import admin


urlpatterns = [
    path('users/', views.UserList.as_view()),
    path('users/<int:pk>/', views.UserList.as_view(), name='user-detail'),
    path('tag1/', views.UserList.as_view()),
    path('tag1/<int:pk>/', views.Tag1List.as_view(), name='tag1-detail'),
    path('tag2/', views.UserList.as_view()),
    path('tag2/<int:pk>/', views.Tag2List.as_view(), name='tag2-detail'),
    path('sensors/', views.SensorList.as_view()),
    path('sensors/<int:pk>/', views.SensorList.as_view(), name='sensors-detail'),
    path('sensors_type/', views.SensorTypeList.as_view()),
    path('sensors_type/<int:pk>/', views.SensorTypeList.as_view(), name='sensors_type-detail'),
    path('data/', views.DataUpload.as_view()),
    path('data/<int:pk>/', views.DataList.as_view(), name='data-detail'),
    path('analysis/', views.AnalysisList.as_view()),
    path('analysis/<int:pk>/', views.AnalysisList.as_view(), name='analysis-detail'),
    path('file/', views.FileUpload.as_view()),
    path('file/<int:pk>/', views.FileList.as_view(), name='file-detail'),
]
