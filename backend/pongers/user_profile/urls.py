from django.urls import path
from .views import UserProfileView, UpdateUserProfileView

urlpatterns = [
    path('user', UserProfileView.as_view(), name='user'),
    path('update', UpdateUserProfileView.as_view(), name='update'),
]