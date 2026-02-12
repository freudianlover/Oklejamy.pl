from django.shortcuts import render
from .models import Service, PortfolioItem # <--- 1. Importujemy drugi model

def home(request):
    services = Service.objects.all()
    portfolio = PortfolioItem.objects.all() # <--- 2. Pobieramy realizacje
    
    # 3. Pakujemy wszystko do jednej paczki
    context = {
        'services': services,
        'portfolio': portfolio,
    }
    
    return render(request, 'website/index.html', context)