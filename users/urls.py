from distutils.log import Log
from django.urls import path

from .views import (
    LoginApiView, 
    RegisterApiView,
    VerifyUserAPIView,
    ResendTokenAPIView,
)

urlpatterns = [
    path("login", LoginApiView.as_view()),
    path("register", RegisterApiView.as_view()),
    path("verify", VerifyUserAPIView.as_view()),
    path("resend", ResendTokenAPIView.as_view()),
]
