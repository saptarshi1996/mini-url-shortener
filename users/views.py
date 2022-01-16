from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from .models import UserProfile
from .serializers import (
    UserSerializer,
)


class UserAPIView(APIView):

    permission_classes = [IsAuthenticated,]

    def get(self, request):
        try:
            user_details = UserProfile.objects.filter(id=request.user.id).only('id', 'first_name', 'last_name', 'email', 'is_verified').first()
            serializer = UserSerializer(user_details)

            return Response(data={
                "user": serializer.data,
                "message": "User details fetched successfully",
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={
                "message": str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
