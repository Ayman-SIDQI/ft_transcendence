from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from accounts.models import UserProfile

class UserProfileView(APIView):
    def get(self, request, format=None):
        user = request.user
        username = user.username
        user = User.objects.get(id=user.id)
        user_profile = UserProfile.objects.get(user=user)
        user_profile = UserProfileSerializer(user_profile)

        return Response({
            'profile': user_profile.data,
            'username': str(username)
        })

class UpdateUserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, format=None):
        user = self.request.user
        username = user.username

        data = self.request.data
        first_name = data['first_name']
        last_name = data['last_name']
        city = data['city']

        UserProfile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, city=city)

        user_profile = UserProfile.objects.get(user=user)
        serialized_profile = UserProfileSerializer(user_profile)

        return Response({
            'profile': serialized_profile.data,
            'username': str(username) 
        })
        
