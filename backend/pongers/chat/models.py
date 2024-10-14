from django.db import models
from django.contrib import settings
from django.contrib.auth.models import User


class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Block(models.Model):
    blocker = models.ForeignKey(User, related_name='blocked', on_delete=models.CASCADE)
    blocked = models.ForeignKey(User, related_name='blocked_by', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

class ChatRoom(models.Model):
    room_id = models.CharField(max_length=200, unique=True)
    player1 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='player2', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=[
        ('pending', 'pending'),
        ('active', 'active'),
        ('joined', 'joined')
    ])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Notification(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='recipient', on_delete=models.CASCADE)
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='sender', on_delete=models.CASCADE)
    notification_type = models.CharField(max_length=40, choices=[
        ('game_invite', 'game_invite'),
        ('game_request', 'game_request'),
        ('message', 'message')
    ])
    content = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    related_object_id = models.IntegerField(null=True)
