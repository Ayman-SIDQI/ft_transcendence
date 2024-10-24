from django.urls import re_path
from . import consumers, matchmaking_consumer

websocket_urlpatterns = [
	re_path(r'ws/game/(?P<room_name>\w+)/$', consumers.MultiplayerConsumer.as_asgi()),
	re_path(r'ws/game/matchmaking/$', matchmaking_consumer.MatchmakingConsumer.as_asgi()),
]