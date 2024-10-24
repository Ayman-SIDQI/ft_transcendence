import json
from channels.generic.websocket import AsyncWebsocketConsumer
from redis import Redis

redis_conn = Redis()

class MatchmakingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.room_name = None

        # Accept the WebSocket connection
        await self.accept()

        # Add the user to the matchmaking queue
        await self.add_to_queue()

    async def disconnect(self, close_code):
        # Remove the user from the matchmaking queue
        await self.remove_from_queue()
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    async def add_to_queue(self):
        # Add player ID to Redis queue
        redis_conn.rpush("matchmaking_queue", self.user.id)
        await self.match_players()
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    async def remove_from_queue(self):
        # Remove player ID from the Redis queue
        redis_conn.lrem("matchmaking_queue", 0, self.user.id)
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    async def match_players(self):
        # Check if there are enough players in the queue to match
        queue_length = redis_conn.llen("matchmaking_queue")
        if queue_length >= 2:
            # Get two players from the queue
            player1_id = redis_conn.lpop("matchmaking_queue")
            player2_id = redis_conn.lpop("matchmaking_queue")
            
            # Create a game room for these players
            self.room_name = f"game_room_{player1_id}_{player2_id}"
            
            # Add both players to the game room group
            await self.channel_layer.group_add(self.room_name, self.channel_name)
            await self.send(text_data=json.dumps({
                'type': 'match_found',
                'room': self.room_name,
                'player1': player1_id.decode('utf-8'),
                'player2': player2_id.decode('utf-8'),
            }))

            # Notify both players (optional: you might want to send notifications)
            await self.channel_layer.group_send(self.room_name, {
                'type': 'player_joined',
                'message': f'Players {player1_id} and {player2_id} have joined the game.'
            })
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    async def player_joined(self, event):
        await self.send(text_data=json.dumps({
            'type': 'info',
            'message': event['message']
        }))
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    async def receive(self, text_data):
        # Handle incoming messages if needed
        pass

