from django.contrib import admin
from .models import Service, PortfolioItem, PortfolioImage

admin.site.register(Service)

# Konfiguracja "Inline" - pozwala wgrywać wiele zdjęć na karcie jednego projektu
class PortfolioImageInline(admin.TabularInline):
    model = PortfolioImage
    extra = 3 # Domyślnie pokaże 3 puste pola na nowe zdjęcia (można dodać więcej)

# Nadpisujemy widok PortfolioItem, żeby zawierał sekcję ze zdjęciami
@admin.register(PortfolioItem)
class PortfolioItemAdmin(admin.ModelAdmin):
    inlines = [PortfolioImageInline]
