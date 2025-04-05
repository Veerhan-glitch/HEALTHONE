from django.contrib import admin
from .models import Test, Lab, Appointment, LabTest  # Import your models here

admin.site.register(Test)
admin.site.register(Lab)
admin.site.register(Appointment)
admin.site.register(LabTest)
# Customize the admin interface for LabTest
@admin.register(LabTest)
class LabTestAdmin(admin.ModelAdmin):
    list_display = ('id', 'lab', 'test', 'appointment', 'created_at')  # Adjust fields as per your model
    search_fields = ('lab__name', 'test__name', 'appointment__id')  # Adjust fields as per your model
    list_filter = ('lab', 'test', 'created_at')  # Adjust fields as per your model
