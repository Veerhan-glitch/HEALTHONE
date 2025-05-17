from rest_framework import serializers
from healthone.backend.models import Test, Lab, Appointment
from healthone.backend.models1.hospital_models import Department, Hospital, Doctor, DoctorAvailability, DoctorPerformance, Patient_Appointment

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = '__all__'

class LabSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lab
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['name']

class HospitalSerializer(serializers.ModelSerializer):
    departments = serializers.SerializerMethodField()

    class Meta:
        model = Hospital
        fields = ['name', 'latitude', 'longitude', 'success_rate', 'departments']

    def get_departments(self, obj):
        departments = obj.doctors.distinct('department').values('department__name')
        return [{"name": d['department__name']} for d in departments]

class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorAvailability
        fields = ['time_slot', 'period']

class DoctorPerformanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorPerformance
        fields = ['year', 'consultations']

class DoctorSerializer(serializers.ModelSerializer):
    availability = serializers.SerializerMethodField()
    hospital = serializers.CharField(source='hospital.name')
    department = serializers.CharField(source='department.name')

    class Meta:
        model = Doctor
        fields = [
            'id','name', 'photo', 'position', 'specialization', 'experience',
            'gender', 'consultation_fee', 'video_consultation_fee',
            'hospital', 'department', 'availability'
        ]

    def get_availability(self, obj):
        availabilities = obj.availability.all()
        morning = [a.time_slot for a in availabilities if a.period == 'morning']
        evening = [a.time_slot for a in availabilities if a.period == 'evening']
        return {"morning": morning, "evening": evening}

class DoctorPerformanceDetailSerializer(serializers.ModelSerializer):
    label = serializers.SerializerMethodField()
    data = serializers.SerializerMethodField()
    photo = serializers.URLField(source='doctor.photo')

    class Meta:
        model = Doctor
        fields = ['label', 'data', 'photo']

    def get_label(self, obj):
        return f"{obj.name}, {obj.specialization}"

    def get_data(self, obj):
        performances = obj.performance.all()
        return [{"x": p.year, "y": p.consultations} for p in performances]
    
class Patient_AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient_Appointment
        fields = ['doctor', 'patient_name', 'phone', 'email', 'address', 'date', 'time_slot', 'consultation_type']    