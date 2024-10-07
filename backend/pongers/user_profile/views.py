from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from .serializers import UserProfileSerializer
from django.contrib.auth.models import User
from accounts.models import UserProfile
from django.core.files.storage import default_storage



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
    # def put(self, request, format=None):
    #     user = self.request.user
    #     username = user.username

    #     data = self.request.data
    #     # first_name = data['first_name']
    #     # last_name = data['last_name']
    #     # city = data['city']

    #     # UserProfile.objects.filter(user=user).update(first_name=first_name, last_name=last_name, city=city)

    #     user_profile = UserProfile.objects.get(user=user)
    #     serialized_profile = UserProfileSerializer(user_profile)
    #     if serialized_profile.is_valid():
    #         if 'avatar' in request.FILES:
    #             if user_profile.avatar:
    #                 default_storage.delete(user_profile.avatar.path)
    #             user_profile.avatar = request.FILES['avatar']
    #             user_profile.save()
    #         serialized_profile.save()
    #         return Response({
    #             'profile': serialized_profile.data,
    #             'username': str(username)
    #         })
    #     return Response(serialized_profile.errors, status=status.HTTP_400_BAD_REQUEST)

        # return Response({
        #     'profile': serialized_profile.data,
        #     'username': str(username) 
        # })
        
