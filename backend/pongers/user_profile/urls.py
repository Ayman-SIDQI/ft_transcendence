from django.urls import path
from .views import UserProfileView, UpdateUserProfileView, ChangePasswordView

urlpatterns = [
    path('user/', UserProfileView.as_view(), name='user'),
    path('update/', UpdateUserProfileView.as_view(), name='update'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),

]