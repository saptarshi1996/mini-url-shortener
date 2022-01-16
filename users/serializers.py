from rest_framework.serializers import (
    ModelSerializer,
)

from .models import UserProfile


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['id', 'first_name', 'last_name', 'email', 'is_verified']
