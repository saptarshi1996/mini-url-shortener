from distutils.log import Log
from django.urls import path

from .views import (
    LoginApiView, RegisterApiView, VerifyUserAPIView
)

urlpatterns = [
    path("login", LoginApiView.as_view()),
    path("register", RegisterApiView.as_view()),
    path("verify", VerifyUserAPIView.as_view()),
]
