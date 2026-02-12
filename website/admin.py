from django.contrib import admin
from .models import Service, PortfolioItem

# To sprawia, że modele są widoczne w panelu admina
admin.site.register(Service)
admin.site.register(PortfolioItem)
# Register your models here.
