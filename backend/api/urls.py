from django.urls import path, include
from profiles import views

urlpatterns = [
    path('hello/', views.hello_world, name='hello_world'),
    path('auth/', include('dj_rest_auth.urls')),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path('', include('profiles.urls')),
]
