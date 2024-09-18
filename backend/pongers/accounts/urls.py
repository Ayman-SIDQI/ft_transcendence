from django.urls import path
from .views import RegisterView, LoginView, set_csrf_token, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('set-csrf-token/', set_csrf_token, name='set-csrf-token'),
]

