from django.db import models
from django.core.validators import EmailValidator

# Create your models here.
class Contact(models.Model):
    email = models.EmailField(
        max_length=254,
        validators = [EmailValidator(message="Please provide a valid email address")]
    )
    name = models.CharField(max_length=100)
    message = models.TextField(max_length=100)