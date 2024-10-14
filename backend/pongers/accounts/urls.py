from django.urls import path
from .views import RegisterView, LoginView, LogoutView, DeleteAccountView, CheckAuthenticatedView, GetUsersView, twofaView, RegisterTwoFAView, Disable2FAView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('authenticated/', CheckAuthenticatedView.as_view(), name='authenticated'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('get-users/', GetUsersView.as_view(), name='get-users'),
	path('token/',TokenObtainPairView.as_view(),name='token-pair'),
	path('refresh-token/',TokenRefreshView.as_view(), name='refresh-token'),
	path('twofa/', twofaView.as_view(), name='twofa'),
	path('twofa-setup/', RegisterTwoFAView.as_view(), name='tfa-setup'),
    path('disable-twofa/', Disable2FAView.as_view(), name='disable-twofa'),
]
