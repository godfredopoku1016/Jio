from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.http import JsonResponse
from .forms import CustomUserCreationForm
from django.contrib.auth.decorators import login_required
def signup_view(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('HomePage')
        return JsonResponse({
            'status': 'error',
            'errors': form.errors.as_json()
        }, status=400)
    form = CustomUserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('HomePage')
        return JsonResponse({
            'status': 'error',
            'errors': form.errors.as_json()
        }, status=400)
    form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

def logout_view(request):
    logout(request)
    return redirect('login')





@login_required() 
def HomePage(request):
    return render(request, 'baseapp/HomePage.html')

