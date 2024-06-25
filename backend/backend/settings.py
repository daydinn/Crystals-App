"""
Django settings for backend project.

Generated by 'django-admin startproject' using Django 5.0.6.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.0/ref/settings/
"""

from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-&0e00wh_4c1u=o0l!bt&lu2jy4i3zzpihf3iih4a&*keen$js7'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',  # Deine API App
    'profiles',  # Deine Profiles App
    'corsheaders',  # Für CORS Unterstützung
    'rest_framework',  # Django REST Framework
    'rest_framework.authtoken',  # Token-Authentifizierung
    'dj_rest_auth',  # Django REST Auth
    'allauth',  # Django AllAuth
    'allauth.account',  # Konto Unterstützung für AllAuth
    'allauth.socialaccount',  # Soziale Konten Unterstützung für AllAuth
    'dj_rest_auth.registration',  # Registrierung Unterstützung für Django REST Auth
]

# Serializer für die Registrierung konfigurieren
REST_AUTH_REGISTER_SERIALIZERS = {
    'REGISTER_SERIALIZER': 'profiles.serializers.CustomRegisterSerializer',
}

# CORS Einstellungen
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # Die URL deines React-Frontends
]

# Middleware Einstellungen
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS Middleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware',  # AllAuth Account Middleware
]

ROOT_URLCONF = 'backend.urls'

# Template Einstellungen
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# Authentication Einstellungen
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

SITE_ID = 1

ACCOUNT_EMAIL_VERIFICATION = 'none'
ACCOUNT_AUTHENTICATION_METHOD = 'username'
ACCOUNT_EMAIL_REQUIRED = False

WSGI_APPLICATION = 'backend.wsgi.application'

# Datenbank Einstellungen
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Passwort Validierung
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalisierung
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

# Statische Dateien (CSS, JavaScript, Bilder)
STATIC_URL = 'static/'

# Standard primary key Feldtyp
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
