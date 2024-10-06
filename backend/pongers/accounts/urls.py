from django.urls import path
from .views import RegisterView, LoginView, GetCSRFToken, LogoutView, DeleteAccountView, CheckAuthenticatedView, GetUsersView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('csrf_token/', GetCSRFToken.as_view()),
    path('authenticated/', CheckAuthenticatedView.as_view(), name='authenticated'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('get-users/', GetUsersView.as_view(), name='get-users'),
]

