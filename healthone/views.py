from django.shortcuts import render
from rest_framework import generics
from healthone.backend.models import Test, Lab, Appointment
from .serializers import TestSerializer, LabSerializer, AppointmentSerializer

def home(request):
    return render(request, 'home.html')

def lab(request):
    return render(request, 'lab.html')

def hos(request):
    return render(request, 'hos.html')

class TestList(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class LabList(generics.ListAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

class AppointmentCreate(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
