import json
from channels.generic.websocket import AsyncWebsocketConsumer


class MultiplayerConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope['user']
        
        # Accessing the path of the connection
        path = self.scope['path']

        # Accessing client information (IP, port)
        client = self.scope['client']

        # Accessing session data
        session = self.scope['session']

        print("HIIIII MOM:  [", user,
        path,
        client,
        session, "]", flush=True)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'pong_{self.room_name}'
        print("HIIIII DAD:  [", self.room_name, "]", flush=True)

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

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Handle game state updates here
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'game_state_update',
                'data': data
            }
        )

    async def game_state_update(self, event):
        data = event['data']
        await self.send(text_data=json.dumps(data))