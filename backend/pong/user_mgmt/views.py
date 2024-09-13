from django.shortcuts import render
from .models import User
from .serializers import UserSerializer
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def index(request):
    return render(request, '/Users/hrahmane/Desktop/42_cursus/ft_transcendence/front/frontend/index.html')
