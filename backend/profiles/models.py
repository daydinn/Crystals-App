# profiles/models.py
from django.db import models
from django.conf import settings

class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
    ]
    
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True)
    age = models.IntegerField(null=True, blank=True) 
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.user.username
