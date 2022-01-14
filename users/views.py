from random import randrange

from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile, UserVerification
from .serializers import RegisterSerializer, LoginSerializer


class LoginApiView(APIView):

    def post(self, request):

        try:

            serializer = LoginSerializer(data=request.data)

            if serializer.is_valid():

                email, password = request.data.get('email'), request.data.get('password')

                # check if user exists.
                user_exists = authenticate(request, email=email, password=password)

                if user_exists:

                    if not user_exists.is_verified:

                        return Response(data={
                            "message": "User not verified",
                        }, status=status.HTTP_401_UNAUTHORIZED)

                    # create a token
                    token, _ = Token.objects.get_or_create(user=user_exists)
                    return Response(data={
                        "message": "User logged in successfully",
                        "data": {
                            "token": str(token)
                        }
                    }, status=status.HTTP_200_OK)

                else:

                    return Response(data={
                        "message": "Invalid username or password",
                    },status=status.HTTP_401_UNAUTHORIZED)
            
            else:
                
                return Response(data={
                    "message": serializer.error_messages,
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            return Response(data={
                "message": str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RegisterApiView(APIView):

    def post(self, request):

        try:

            serializer = RegisterSerializer(data=request.data)

            if serializer.is_valid():

                email: str = request.data.get('email')

                # check if the user already exists?
                user_exists = UserProfile.objects.filter(email=email).first()

                if user_exists:

                    return Response(data={
                        "message": "User already exists",
                    }, status=status.HTTP_400_BAD_REQUEST)

                # create a new user.
                user_object = UserProfile(
                    email=email,
                    first_name=request.data.get('first_name'),
                    last_name=request.data.get('last_name')
                )

                user_object.set_password(request.data.get('password'))
                user_object.save()

                otp = randrange(100000, 999999)

                UserVerification(
                    otp=otp,
                    user_id=user_object,
                ).save()

                return Response(data={
                    "message": "User registered successfully",
                }, status=status.HTTP_200_OK)

            else:

                return Response(data={
                    "message": serializer.error_messages
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            return Response(data={
                "message": str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
