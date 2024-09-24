from django.urls import path
from .views import UserProfileView, UpdateUserProfileView

urlpatterns = [
    path('user', UserProfileView.as_view(), name='user_profile'),
    path('update', UpdateUserProfileView.as_view(), name='update_user_profile'),
]