from rest_framework.serializers import ModelSerializer

from .models import UserUrl


class UserUrlSerializer(ModelSerializer):

    class Meta:
        model = UserUrl
        fields = ['id', 'original_url', 'short_url', 'clicks', 'created_at']
