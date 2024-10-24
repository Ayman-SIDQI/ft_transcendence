from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('accounts.urls')),
    path('', include('user_profile.urls')),
    path('', include('django.contrib.auth.urls')),
	path('', include('multiplayer.urls')),
]
