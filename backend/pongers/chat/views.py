from django.shortcuts import render, redirect, get_object_or_404
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from .models import ChatRoom, Notification
import uuid
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def chat(request, room_name):
    return render(request, 'chat/chat.html', {'room_name': room_name})

User = get_user_model()

@login_required
def index(request):
    return render(request, 'chat/index.html')

@login_required
def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })

@login_required
def view_profile(request, user_id):
    user = get_object_or_404(User, id=user_id)
    return render(request, 'chat/profile.html', {'profile_user': user})

@login_required
def invite_to_pong(request, user_id):
    invited_user = get_object_or_404(User, id=user_id)
    #create new game room
    game_room = ChatRoom.objects.create(
        room_id = str(uuid.uuid4()),
        player1 = request.user,
        player2 = invited_user,
        status = 'pending'
    )
    #create notification
    notification = Notification.objects.create(
        recipient = invited_user,
        sender = request.user,
        notification_type = 'game_invite',
        content=f'You have been invited to play pong by {request.user.username}',
        related_object_id = game_room.id
    )
    #send notification to recipient
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"user_{invited_user.id}",
        {
            "type": "send_notification",
            "message": {
                "type": "game_invite",
                "sender": request.user.username,
                "game_room_id": game_room.room_id
            }
        }
    )
    return JsonResponse({'message': f'Invited {invited_user.username} to play pong!'})

