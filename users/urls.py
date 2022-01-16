from distutils.log import Log
from django.urls import path

from .views import (
    UserAPIView,
)

urlpatterns = [
    path("user-profile", UserAPIView.as_view()),
]
