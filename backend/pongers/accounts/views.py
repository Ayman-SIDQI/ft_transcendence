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
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from .twofa_utils import verify_token, generate_qrcode, secret_twofa, generate_uri


def validate_username(username):
	if len(username) < 4:
		raise ValidationError('Username must be at least 4 characters long')
	if not username.isalnum():
		raise ValidationError('Username must contain only alphanumeric characters')

# @method_decorator(csrf_protect, name='dispatch')
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
		#	 if User.objects.filter(username=username).exists():
		#		 return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
		#	 if User.objects.filter(email=email).exists():
		#		 return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
		#	 if password == confirm_password:
		#		 user = User.objects.create_user(username=username, email=email, password=password)
		#		 user.save()
		#		 user = User.objects.get(id=user.id)
		#		 user_profile = UserProfile(user=user, username=username, email=email)
		#		 user_profile.save()
		#		 return Response({'success': 'User created successfully!'}, status=status.HTTP_201_CREATED)
		#	 else:
		#		 return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

		# except:
		#	 return Response({'error': 'Error while registering user'}, status=status.HTTP_400_BAD_REQUEST)

# @method_decorator(csrf_protect, name='dispatch')
from django.core.files.base import ContentFile

class RegisterTwoFAView(APIView):
	def get(self, request, format=None):
		data = self.request.data
		username = data['username']
		user = UserProfile.objects.get(username=username)
		user.twofa_secret = secret_twofa()
		user.save()
		print (user.twofa_secret)
		qrImageTag = generate_qrcode(generate_uri(username, user.twofa_secret))
		return  Response({
				'qrimage': qrImageTag,
			})
	def post(self, request, format=None):
		data = self.request.data
		username = data['username']
		user = UserProfile.objects.get(username=username)
		print (data['otp'])
		print(user.email)
		print(user.twofa_secret)
		if verify_token(user.twofa_secret, data['otp']):
			user.twofa_status = True
			user.save()
			return Response({'twofa': 'Succesfully enabled'}, status=status.HTTP_200_OK)
		else:
			print ("oheeeeheeee")
			return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


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

# @method_decorator(csrf_protect, name='dispatch')  



class twofaView(APIView):
	def post(self, request, format=None):
		print ("================am here====================")
		try:
			#IsAuthenticated = request.user.is_authenticated
			print (request.user)
			if 1: #IsAuthenticated:
				#print(IsAuthenticated)
				refresh = RefreshToken.for_user(user)
				print (refresh)
				data = self.request.data
				username = data['username']
				otp = data['otp']
				user = UserProfile.objects.get(username=username)
				if verify_token(user.twofa_secret ,otp):
					
					return Response({
						'username': username,
						'refresh': str(refresh),
						'access': str(refresh.access_token)
			}, status=status.HTTP_202_ACCEPTED)
				else:
					return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
		except:
			return Response({'error': 'Error while checking authentication'},  status=status.HTTP_401_UNAUTHORIZED)
		


from django.shortcuts import redirect

class LoginView(APIView):
	permission_classes = (permissions.AllowAny, )
		
	def post(self, request, format=None):
		data = self.request.data
		username = data['username']
		password = data['password']
		user = UserProfile.objects.get(username=username)
		twofa_status = user.twofa_status
		user = authenticate(username=username, password=password)
		if user is not None and not twofa_status:
			refresh = RefreshToken.for_user(user)
			return Response({
				'username': username,
				'refresh': str(refresh),
				'access': str(refresh.access_token)
			}, status=status.HTTP_202_ACCEPTED)
		elif user is not None and twofa_status:
			return Response({
                'message': '2FA OTP required',
                'username': username,
                'redirect_url': 'twofa/'  # Provide the URL for the 2FA page
            }, status=status.HTTP_202_ACCEPTED)
		else:
			return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

# @method_decorator(csrf_protect, name='dispatch') 
class LogoutView(APIView):
	def post(self, request, format=None):
		try:
			refresh_token = request.data["refresh_token"]
			token = RefreshToken(refresh_token)
			token.blacklist()
			auth.logout(request)
			return Response({"success": "Successfully logged out."}, status=status.HTTP_200_OK)
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
	
	#permission_classes = (permissions.AllowAny, )
	permission_classes = [IsAuthenticated]
	authentication_classes = [JWTAuthentication]
	def get(self, request, format=None):

		users = User.objects.all()
		users = UserSerializer(users, many=True)
		return Response(users.data, )
