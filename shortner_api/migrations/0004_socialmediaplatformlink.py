# Generated by Django 4.0.1 on 2022-01-16 15:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shortner_api', '0003_userurl_facebook_click_userurl_linkedin_click_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='SocialMediaPlatformLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('shareable_link', models.TextField()),
                ('platform', models.CharField(max_length=100)),
                ('is_active', models.BooleanField(default=False)),
            ],
        ),
    ]