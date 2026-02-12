# website/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Pusty cudzysłów '' oznacza stronę główną (home)
    path('', views.home, name='home'),
]

