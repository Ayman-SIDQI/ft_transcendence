from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	username = models.CharField(max_length=100, unique=True)
	email = models.EmailField(max_length=100, unique=True)
	country = models.CharField(max_length=100, blank=True)
	date_of_birth = models.DateField(null=True, blank=True)
	avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
	twofa_status = models.BooleanField(default=False)
	twofa_secret = models.CharField(max_length=100, blank=True)
	login_status = models.BooleanField(default=False)
	
	def __str__(self):
		return self.username
