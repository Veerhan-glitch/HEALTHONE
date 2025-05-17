from django.contrib import admin
from .models import Test, Lab, Appointment, LabTest  # Import your models here
from .models1.hospital_models import Department, Hospital, Doctor, DoctorAvailability, DoctorPerformance, Patient_Appointment


admin.site.register(Test)
admin.site.register(Lab)
admin.site.register(Appointment)
admin.site.register(LabTest)
# Register models
admin.site.register(Department)
admin.site.register(Hospital)
admin.site.register(Doctor)
admin.site.register(DoctorAvailability)
admin.site.register(DoctorPerformance)
admin.site.register(Patient_Appointment)