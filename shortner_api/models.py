from django.db import models

from users.models import UserProfile


# Create your models here.
class UserUrl(models.Model):

    original_url = models.TextField()
    short_url = models.TextField()

    clicks = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    user = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name
