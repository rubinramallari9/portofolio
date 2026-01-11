from django.db import models

# Create your models here.
class Contacts(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(
        unique=True,
        blank=False,
        null=False
    )
    message = models.TextField(
        blank=True,
        null=True,
        default='No description provided'
    )