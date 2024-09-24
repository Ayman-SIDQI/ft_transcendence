from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100, default='default')
    last_name = models.CharField(max_length=100, default='default')
    city = models.CharField(max_length=100, default='default')

    def __str__(self):
        return self.username
