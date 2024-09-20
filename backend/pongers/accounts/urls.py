from django.urls import path
from .views import RegisterView, LoginView, GetCSRFToken, LogoutView, DeleteAccountView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('csrf_token/', GetCSRFToken.as_view()),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
]

