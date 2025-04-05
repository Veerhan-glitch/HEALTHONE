from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('lab/', views.lab, name='lab'),
    path('hos/', views.hos, name='hos'),
    path('api/tests/', views.TestList.as_view(), name='test-list'),
    path('api/labs/', views.LabList.as_view(), name='lab-list'),
    path('api/appointments/', views.AppointmentCreate.as_view(), name='appointment-create'),
]
