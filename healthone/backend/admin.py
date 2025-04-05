from django.contrib import admin
from .models import Test, Lab, Appointment, LabTest  # Import your models here

admin.site.register(Test)
admin.site.register(Lab)
admin.site.register(Appointment)
admin.site.register(LabTest)
