import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

User = get_user_model()

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        sender = self.scope["user"]
        recipient_id = data['recipient_id']

        if not await self.is_blocked(sender.id, recipient_id):
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'sender_id': sender.id,
                    'recipient_id':recipient_id
                }
            )
            
    async def chat_message(self, event):
        message = event['message']
        sender_id = event['sender_id']
        recipient_id = event['recipient_id']
        await self.send(text_data=json.dumps({
            'message': message,
            'sender_id': sender_id,
            'recipient_id': recipient_id
            }))
        
    @database_sync_to_async
    def is_blocked(self, sender_id, recipient_id):
        sender = User.objects.get(id=sender_id)
        recipient = User.objects.get(id=recipient_id)
        return recipient.blocked_users.filter(id=sender_id).exists()
        

