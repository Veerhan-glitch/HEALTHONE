from django.urls import path
from . import views
from django.contrib import admin
from healthone.backend.MLmodels.askagain import diagnosis_view, diagnosis_step

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('lab/', views.lab, name='lab'),
    path('hos/', views.hos, name='hos'),
    path('bot/', views.bot, name='bot'),
    path('api/tests/', views.TestList.as_view(), name='test-list'),
    path('api/labs/', views.LabList.as_view(), name='lab-list'),
    path('api/appointments/', views.AppointmentCreate.as_view(), name='appointment-create'),
    path('predict/', views.predict, name='predict'),
    path('diagnosis/', diagnosis_view, name='diagnosis'),
    path('diagnosis_step/', diagnosis_step, name='diagnosis_step'),
    path('video_list/', views.video_list, name='video_list'), # for video fetching
    path('video_detail/<str:title>/', views.video_detail, name='video_detail'), # for video page
]
