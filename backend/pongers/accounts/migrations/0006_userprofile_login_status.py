# Generated by Django 4.2.16 on 2024-10-11 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_userprofile_twofa_secret_userprofile_twofa_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='login_status',
            field=models.BooleanField(default=False),
        ),
    ]