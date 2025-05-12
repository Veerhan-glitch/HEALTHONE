from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Hospital(models.Model):
    name = models.CharField(max_length=100, unique=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    success_rate = models.IntegerField(default=80)  # Percentage (e.g., 85 for 85%)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    name = models.CharField(max_length=200)
    photo = models.URLField(max_length=500)
    position = models.CharField(max_length=200)
    specialization = models.CharField(max_length=200)
    experience = models.CharField(max_length=50)
    gender = models.CharField(max_length=20)
    consultation_fee = models.IntegerField()
    video_consultation_fee = models.IntegerField()
    hospital = models.ForeignKey(Hospital, on_delete=models.CASCADE, related_name='doctors')
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='doctors')

    def __str__(self):
        return self.name

class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='availability')
    time_slot = models.CharField(max_length=50)
    period = models.CharField(max_length=20, choices=[('morning', 'Morning'), ('evening', 'Evening')])

    def __str__(self):
        return f"{self.doctor.name} - {self.time_slot} ({self.period})"

class DoctorPerformance(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='performance')
    year = models.IntegerField()
    consultations = models.IntegerField()  # Number of consultations in the year

    def __str__(self):
        return f"{self.doctor.name} - {self.year}: {self.consultations}"