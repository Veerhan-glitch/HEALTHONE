from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models1.hospital_models import Department, Hospital, Doctor, DoctorAvailability, DoctorPerformance
import json
from healthone.serializers import (
    DepartmentSerializer, HospitalSerializer, DoctorSerializer,
    DoctorPerformanceDetailSerializer, Patient_AppointmentSerializer
)

def index(request):
    return render(request, 'hospital/hos.html')

def home(request):
    return render(request, 'home.html')

class HospitalListView(APIView):
    def get(self, request):
        hospitals = Hospital.objects.all()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data)

class DepartmentListView(APIView):
    def get(self, request):
        departments = Department.objects.all()
        serializer = DepartmentSerializer(departments, many=True)
        return Response(serializer.data)

class DepartmentsForHospitalView(APIView):
    def get(self, request, hospital_name):
        hospital = Hospital.objects.get(name=hospital_name)
        departments = hospital.doctors.distinct('department')
        serializer = DepartmentSerializer([d.department for d in departments], many=True)
        return Response(serializer.data)

class HospitalsForDepartmentView(APIView):
    def get(self, request, department_name):
        hospitals = Hospital.objects.filter(doctors__department__name=department_name).distinct()
        serializer = HospitalSerializer(hospitals, many=True)
        return Response(serializer.data)

class DoctorListView(APIView):
    def get(self, request, hospital_name=None, department_name=None):
        doctors = Doctor.objects.all()
        if hospital_name:
            doctors = doctors.filter(hospital__name=hospital_name)
        if department_name:
            doctors = doctors.filter(department__name=department_name)
        doctor_name = request.GET.get('name')
        if doctor_name:
            doctors = doctors.filter(name__icontains=doctor_name)
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)

class DoctorPerformanceView(APIView):
    def get(self, request):
        doctors = Doctor.objects.prefetch_related('performance').all()
        serializer = DoctorPerformanceDetailSerializer(doctors, many=True)
        return Response(serializer.data)
    

class patient_AppointmentCreateView(APIView):
    def post(self, request):
        serializer = Patient_AppointmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    