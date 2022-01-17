from django.db import models

from users.models import UserProfile


# Create your models here.
class UserUrl(models.Model):

    original_url = models.TextField()
    short_url = models.TextField()

    clicks = models.IntegerField(default=0)
    facebook_click = models.IntegerField(default=0)
    linkedin_click = models.IntegerField(default=0)
    whatsapp_click = models.IntegerField(default=0)
    twitter_click = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    user = models.ForeignKey(to=UserProfile, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.first_name


class SocialMediaPlatformLink(models.Model):

    shareable_link = models.TextField()
    platform = models.CharField(max_length=100)
    rgb_code = models.CharField(max_length=100, default=None)

    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.platform
