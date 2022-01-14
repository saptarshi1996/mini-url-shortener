from rest_framework.serializers import ModelSerializer, EmailField

from .models import UserProfile


class RegisterSerializer(ModelSerializer):

    email = EmailField()

    class Meta:

        model = UserProfile
        fields = ['first_name', 'last_name', 'email', 'password']


class LoginSerializer(ModelSerializer):

    email = EmailField()

    class Meta:

        model = UserProfile
        fields = ['email', 'password']
