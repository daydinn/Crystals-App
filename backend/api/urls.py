# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from dj_rest_auth.registration.views import RegisterView
from . import views

router = DefaultRouter()

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('auth/registration/', RegisterView.as_view(), name='rest_register'),
    path('', include(router.urls)),
]
