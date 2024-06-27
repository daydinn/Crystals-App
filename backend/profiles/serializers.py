from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import UserProfile

class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(max_length=30)
    last_name = serializers.CharField(max_length=30)
    gender = serializers.ChoiceField(choices=UserProfile.GENDER_CHOICES)
    age = serializers.IntegerField()
    birth_date = serializers.DateField()

    def get_cleaned_data(self):
        data = super().get_cleaned_data()
        data['first_name'] = self.validated_data.get('first_name', '')
        data['last_name'] = self.validated_data.get('last_name', '')
        data['gender'] = self.validated_data.get('gender', '')
        data['age'] = self.validated_data.get('age', 0)
        data['birth_date'] = self.validated_data.get('birth_date', None)
        return data

    def save(self, request):
        user = super().save(request)
        UserProfile.objects.create(
            user=user,
            first_name=self.validated_data.get('first_name', ''),
            last_name=self.validated_data.get('last_name', ''),
            gender=self.validated_data.get('gender', ''),
            age=self.validated_data.get('age', 0),
            birth_date=self.validated_data.get('birth_date', None)
        )
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['first_name', 'last_name', 'gender', 'age', 'birth_date']