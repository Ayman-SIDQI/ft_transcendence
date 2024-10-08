from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from accounts.models import UserProfile
from django.core.files.storage import default_storage
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import update_session_auth_hash


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
        user_profile = UserProfile.objects.get(user=user)

        if 'avatar' in request.FILES:
            if user_profile.avatar:
                default_storage.delete(user_profile.avatar.path)
            
            user_profile.avatar = request.FILES['avatar']

            if 'username' in request.data:
                user_profile.username = request.data['username']
            if 'country' in request.data:
                user_profile.country = request.data['country']
            if 'date_of_birth' in request.data:
                user_profile.date_of_birth = request.data['date_of_birth']

            user_profile.save()

            serialized_profile = UserProfileSerializer(user_profile)
            
            return Response({
                'profile': serialized_profile.data,
                'username': str(user.username)
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'error': 'No avatar file provided'
            }, status=status.HTTP_400_BAD_REQUEST)
        
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = self.request.user
        # user_profile = UserProfile.objects.get(user=user)
        current_password = request.data['current_password']
        new_password = request.data['new_password']
        confirm_new_password = request.data['confirm_new_password']

        if not user.check_password(current_password):
            return Response({
                'error': 'Current password is incorrect'
            }, status=status.HTTP_400_BAD_REQUEST)
        if new_password != confirm_new_password:
            return Response({
                'error': 'New passwords do not match'
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(new_password, user)
        except ValidationError as e:
            return Response({
                'error': e.messages
            }, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)
        return Response({
            'message': 'Password updated successfully'
        }, status=status.HTTP_200_OK)

    
        
