from rest_framework.serializers import ModelSerializer

from .models import UserUrl


class UserUrlSerializer(ModelSerializer):

    class Meta:
        model = UserUrl
        fields = ['id', 'original_url', 'short_url', 'clicks', 'created_at', 'facebook_click', 'twitter_click', 'linkedin_click', 'whatsapp_click']


class EditUserUrlSerializer(ModelSerializer):

    class Meta: 
        model = UserUrl
        fields = ['short_url']
