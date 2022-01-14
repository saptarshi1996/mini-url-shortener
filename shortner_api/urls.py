from django.urls import path

from .views import ShortnerGetView, ShortnerPostView

urlpatterns = [
    path("sr/<str:id>", ShortnerGetView.as_view()),
    path("shortner", ShortnerPostView.as_view())
]
