from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.utils.decorators import method_decorator

# @ensure_csrf_cookie
# def set_csrf_token(request):
#     return Response({'success': 'CSRF cookie set'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )
    def get(self, request):
        return Response({'success': 'CSRF cookie set'})

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                login(request, user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@method_decorator(csrf_protect, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        # print(username)
        # print(password)
        if username is None or password is None:
            return Response({
                "error": "Please provide both username and password"
            })
        user = authenticate(username=username, password=password)
        if user:
            return Response({'success': 'good'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'success': 'User logged out successfully!'}, status=status.HTTP_200_OK)


class DeleteAccountView(APIView):
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = (permissions.AllowAny, )
    @method_decorator(csrf_protect)
    def delete(self, request, format=None):
        user = self.request.user
        print(request.data.get('username'))
        try:
            user.delete()
            return Response({'success': 'Account deleted successfully!'}, status=status.HTTP_200_OK)
        except:
            return Response({'error': 'Unable to delete.'}, status=status.HTTP_400_BAD_REQUEST)
