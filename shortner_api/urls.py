from django.urls import path

from .views import (
    ShortnerGetView, 
    ShortnerAPIView, 
    ShortnerDetailView, 
    SocialMediaLinkAPIView,
)

urlpatterns = [
    path("sr/<str:id>", ShortnerGetView.as_view()),
    path("shortner", ShortnerAPIView.as_view()),
    path("shortner/<int:id>", ShortnerDetailView.as_view()),
    path("share/<int:id>", SocialMediaLinkAPIView.as_view()),
]
