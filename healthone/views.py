from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from healthone.backend.models import Test, Lab, Appointment, Video
from .serializers import TestSerializer, LabSerializer, AppointmentSerializer
from healthone.backend.MLmodels.ml.ml_runer import predict_robust_ml  
from healthone.backend.MLmodels.askagain import diagnosis_view, diagnosis_step # keep even if says not used as we only need import not call
from django.http import JsonResponse
from healthone.backend.backendstorages.filebase_storage import FilebaseStorage

def home(request):
    return render(request, 'home.html')

def lab(request):
    return render(request, 'lab.html')

def hos(request):
    return render(request, 'hos.html')

def bot(request):
    return render(request, 'bot.html')

def video(request):
    return render(request, 'video_detail.html')

def video_detail(request, title):
    video = Video.objects.filter(title__iexact=title).first()
    if video:
        presigned_url = video.get_presigned_url()
    else:
        presigned_url = None
    return render(request, 'video_detail.html', {
        'video': video,
        'presigned_url': presigned_url,
    })

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

