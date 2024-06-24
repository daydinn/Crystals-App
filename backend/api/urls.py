from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter  # Importiere DefaultRouter

from . import views


router = DefaultRouter()


urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('auth/', include('dj_rest_auth.urls')),
    path('', include(router.urls)),

    path('auth/registration/', include('dj_rest_auth.registration.urls')),
]