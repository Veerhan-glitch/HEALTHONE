from django.db import models

class Test(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    overview = models.TextField(blank=True, null=True)
    purpose = models.TextField(blank=True, null=True)
    procedure = models.TextField(blank=True, null=True)
    side_effects = models.TextField(blank=True, null=True)
    results = models.TextField(blank=True, null=True)
    preparation_required = models.BooleanField(default=False)
    turnaround_time = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name

class Lab(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=6, blank=True, null=True)

    def __str__(self):
        return self.name

class Appointment(models.Model):
    test = models.ForeignKey(Test, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    appointment_time = models.TimeField()
    full_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField(max_length=100)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} - {self.test.name} on {self.appointment_date}"
