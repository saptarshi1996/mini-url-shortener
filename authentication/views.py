from random import randrange

from django.contrib.auth import authenticate

from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated


from users.models import UserProfile, UserVerification
from .serializers import (
    RegisterSerializer, 
    LoginSerializer,
    VerifyUserSerializer,
    ResendTokenSerializer,
)


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
                        "token": str(token),
                    }, status=status.HTTP_200_OK)

                else:

                    return Response(data={
                        "message": "Invalid username or password",
                    },status=status.HTTP_401_UNAUTHORIZED)
            
            else:
                
                return Response(data={
                    "errors": serializer.error_messages,
                    "message": "Validation failed",
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
                user_exists = UserProfile.objects.filter(email=email).only('id').first()

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
                    "errors": serializer.error_messages,
                    "message": "Validation failed",
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            return Response(data={
                "message": str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


class VerifyUserAPIView(APIView):

    def post(self, request):

        # this will contain two params. otp: number, email: string

        try:

            serializer = VerifyUserSerializer(data=request.data)

            if serializer.is_valid():

                email, otp = request.data.get('email'), request.data.get('otp')

                # check if the email exists.
                user_exists = UserProfile.objects.filter(email=email).only('id', 'is_verified').first()

                if not user_exists:
                    return Response(data={
                        "message": "User does not exists",
                    },status=status.HTTP_404_NOT_FOUND)

                if user_exists.is_verified:
                    return Response(data={
                        "message": "User already verified",
                    },status=status.HTTP_400_BAD_REQUEST)

                # check if verification exists
                user_verification = UserVerification.objects.filter(user_id=user_exists, otp=otp).first()

                if not user_verification:

                    return Response(data={
                        "message": "Invalid user verification",
                    }, status=status.HTTP_400_BAD_REQUEST)

                user_verification.is_revoked = True
                user_verification.save()

                # also verify the user.
                UserProfile.objects.filter(id=user_exists.id).update(is_verified=True)

                return Response(data={
                    "message": "User verified successfully",
                }, status=status.HTTP_200_OK)
                
            else:
                return Response(data={
                    "errors": serializer.error_messages,
                    "message": "Validation failed",
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            return Response(data={
                "message": str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 


class ResendTokenAPIView(APIView):

    def post(self, request):

        try:

            serializer = ResendTokenSerializer(data=request.data)

            if serializer.is_valid():

                email = request.data.get('email')

                # check if the email exists.
                user_exists = UserProfile.objects.filter(email=email).only('id', 'is_verified').first()

                if not user_exists:
                    return Response(data={
                        "message": "User does not exists",
                    },status=status.HTTP_404_NOT_FOUND)

                # for this user, revoke previous otp's
                UserVerification.objects.filter(user_id=user_exists).update(is_revoked=True)

                # create a new otp for this user.
                otp = randrange(100000, 999999)

                UserVerification(
                    otp=otp,
                    user_id=user_exists,
                ).save()

                return Response(data={
                    "message": "Otp sent to user successfully",
                }, status=status.HTTP_200_OK)
                
            else:
                return Response(data={
                    "errors": serializer.error_messages,
                    "message": "Validation failed",
                }, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={
                "message": str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
