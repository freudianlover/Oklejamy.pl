from django.db import models

class Service(models.Model):
    title = models.CharField(max_length=100, verbose_name="Nazwa usługi")
    description = models.TextField(verbose_name="Opis")
    # Ważne: ImageField wymaga biblioteki Pillow
    icon = models.ImageField(upload_to='services_icons/', verbose_name="Ikona/Zdjęcie")
    
    def __str__(self):
        return self.title

class PortfolioItem(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='portfolio/')
    # Opcjonalnie kategoria (np. zmiana koloru, folia ochronna)
    