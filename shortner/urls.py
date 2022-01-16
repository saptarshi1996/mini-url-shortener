from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("mus/", include('shortner_api.urls')),
    path("auth/", include('authentication.urls')),
    path("user/", include("users.urls")),
]
