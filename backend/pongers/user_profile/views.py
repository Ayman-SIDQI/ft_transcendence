from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileView(APIView):
    def get(self, request, format=None):
        user = request.user
        username = user.username
        user = User.objects.get(id=user.id)
        user_profile = UserProfile.objects.filter(user=user)
        user_profile = UserProfileSerializer(user_profile)
        return Response({'profile': user_profile.data, 'username': str(username)})

