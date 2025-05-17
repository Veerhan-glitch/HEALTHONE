from django.urls import path
from ..views1 import hospital_views
urlpatterns = [
    path('hospitals/', hospital_views.HospitalListView.as_view(), name='get_hospitals'),
    path('departments/', hospital_views.DepartmentListView.as_view(), name='get_departments'),
    path('hospitals/<str:hospital_name>/departments/', hospital_views.DepartmentsForHospitalView.as_view(), name='get_departments_for_hospital'),
    path('departments/<str:department_name>/hospitals/', hospital_views.HospitalsForDepartmentView.as_view(), name='get_hospitals_for_department'),
    path('doctors/', hospital_views.DoctorListView.as_view(), name='get_doctors'),
    path('hospitals/<str:hospital_name>/departments/<str:department_name>/doctors/', hospital_views.DoctorListView.as_view(), name='get_doctors_by_hospital_department'),
    path('doctor-performance/', hospital_views.DoctorPerformanceView.as_view(), name='get_doctor_performance'),
    path('patientappointments/', hospital_views.patient_AppointmentCreateView.as_view(), name='create_appointment'),
]


