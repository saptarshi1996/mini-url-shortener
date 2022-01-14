from pyexpat import model
from statistics import mode
from django.db import models
from django.contrib.auth.models import AbstractBaseUser

from .managers import CustomUserManager

# Create your models here.
class UserProfile(AbstractBaseUser):

    username = None
    email = models.EmailField(unique=True)

    first_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
    
    def __str__(self):
        return self.email


class ApiToken(models.Model):

    api_token = models.CharField(max_length=20, unique=True)
    user = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE)
    api_rate = models.IntegerField(default=100, blank=True,  null=True)

    def __str__(self):
        return self.user.first_name
