from django.shortcuts import render
from rest_framework import generics
from healthone.backend.models import Test, Lab, Appointment
from .serializers import TestSerializer, LabSerializer, AppointmentSerializer
from healthone.backend.MLmodels.ml.ml_runer import predict_robust_ml  # Import the prediction function
from healthone.backend.MLmodels.askagain import diagnosis_view, diagnosis_step
from django.http import JsonResponse

def home(request):
    return render(request, 'home.html')

def lab(request):
    return render(request, 'lab.html')

def hos(request):
    return render(request, 'hos.html')

def video(request):
    return render(request, 'video.html')

class TestList(generics.ListAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer

class LabList(generics.ListAPIView):
    queryset = Lab.objects.all()
    serializer_class = LabSerializer

class AppointmentCreate(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

def predict(request):
    user_input = request.POST.get('input_text')
    
    if not user_input:
        return JsonResponse({"error": "Input text is required"}, status=400)

    result = predict_robust_ml(user_input)
    return JsonResponse(result)

