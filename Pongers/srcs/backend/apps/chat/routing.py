from django.urls import path, re_path
from . import consumers

websocket_uslpatters = [
    re_path(r'ws/chat/$', consumers.ChatConsumer.as_asgi()),
]