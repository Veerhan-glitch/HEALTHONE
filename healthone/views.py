from django.shortcuts import render

def home(request):
    return render(request, 'home.html')

def lab(request):
    return render(request, 'lab.html')

def hos(request):
    return render(request, 'hos.html')