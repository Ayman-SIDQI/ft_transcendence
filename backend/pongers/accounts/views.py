from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from rest_framework.permissions import IsAuthenticated
from django.utils.decorators import method_decorator
from .models import UserProfile, User
from django.contrib import auth
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError



@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        return Response({'success': 'CSRF cookie set'})

def validate_username(username):
    if len(username) < 4:
        raise ValidationError('Username must be at least 4 characters long')
    if not username.isalnum():
        raise ValidationError('Username must contain only alphanumeric characters')

@method_decorator(csrf_protect, name='dispatch')
class RegisterView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        email = data['email']
        password = data['password']
        confirm_password = data['confirm_password']

        if not all([username, email, password, confirm_password]):
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_username(username)
        except ValidationError as e:
            return Response({'error': str(e.messages[0])}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        if password != confirm_password:
            return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'error': str(e.messages[0])}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            UserProfile.objects.create(user=user ,username=username, email=email)
            return Response({'success': 'User created successfully!'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        # try:
        #     if User.objects.filter(username=username).exists():
        #         return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        #     if User.objects.filter(email=email).exists():
        #         return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        #     if password == confirm_password:
        #         user = User.objects.create_user(username=username, email=email, password=password)
        #         user.save()
        #         user = User.objects.get(id=user.id)
        #         user_profile = UserProfile(user=user, username=username, email=email)
        #         user_profile.save()
        #         return Response({'success': 'User created successfully!'}, status=status.HTTP_201_CREATED)
        #     else:
        #         return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

        # except:
        #     return Response({'error': 'Error while registering user'}, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request, format=None):
        try:
            IsAuthenticated = User.is_authenticated
            if IsAuthenticated:
                return Response({'isAuthenticated': 'true'})
            else:
                return Response({'isAuthenticated': 'false'})
        except:
            return Response({'error': 'Error while checking authentication'})

@method_decorator(csrf_protect, name='dispatch')   
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']
        try:
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                return Response({'success': 'User authenticated', 'username': username })
            else:
                return Response({'error': 'Error authenticating'})
        except:
            return Response({'error': 'Something went wrong while logging in'})
    
@method_decorator(csrf_protect, name='dispatch') 
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': 'User logged out successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Error logging out'}, status=status.HTTP_400_BAD_REQUEST)

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            user = User.objects.filter(id=user.id).delete()
            return Response({'success':'User deleted successfully'})
        except:
            return Response({'error': 'Something went wrong while deleting the user'})

class GetUsersView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):

        users = User.objects.all()
        users = UserSerializer(users, many=True)
        return Response(users.data)
