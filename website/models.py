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
    image = models.ImageField(upload_to='portfolio/') # To będzie nasza miniaturka (okładka) w siatce

    def __str__(self):
        return self.title

# NOWOŚĆ: Model dla dodatkowych zdjęć w galerii
class PortfolioImage(models.Model):
    # Klucz obcy - łączy to zdjęcie z konkretnym PortfolioItem
    # related_name='images' pozwala nam potem w HTML wpisać: item.images.all
    portfolio_item = models.ForeignKey(PortfolioItem, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='portfolio/gallery/')

    def __str__(self):
        return f"Zdjęcie galerii dla: {self.portfolio_item.title}"