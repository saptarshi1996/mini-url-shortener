from rest_framework.serializers import (
    ModelSerializer, 
    Serializer,
    EmailField,
    IntegerField,
)

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


class VerifyUserSerializer(Serializer):
    email = EmailField()
    otp = IntegerField()


class ResendTokenSerializer(Serializer):
    email = EmailField()
