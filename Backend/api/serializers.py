from rest_framework import serializers
from .models import UserProfile, Media, Storage, Project
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = UserProfile
        fields = ['user', 'profile_picture']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)
        user_profile = UserProfile.objects.create(user=user, **validated_data)
        return user_profile

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user')
        user = instance.user

        instance.profile_picture = validated_data.get('profile_picture', instance.profile_picture)
        instance.save()

        user.username = user_data.get('username', user.username)
        if 'password' in user_data:
            user.set_password(user_data['password'])
        user.save()

        return instance

class MediaSerializer(serializers.ModelSerializer):
    uploaded_by = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    total_storage = serializers.FloatField(source='storage.total', read_only=True)

    class Meta:
        model = Media
        fields = ['id', 'type', 'size', 'uploaded_by', 'storage', 'created_at', 'updated_at', 'total_storage']


    def create(self, validated_data):
        media = Media.objects.create(**validated_data)
        storage = media.storage
        storage.used += media.size
        storage.save()
        return media

    def update(self, instance, validated_data):
        original_size = instance.size
        instance.type = validated_data.get('type', instance.type)
        instance.size = validated_data.get('size', instance.size)
        instance.uploaded_by = validated_data.get('uploaded_by', instance.uploaded_by)
        instance.storage = validated_data.get('storage', instance.storage)
        instance.save()

        if instance.size != original_size:
            instance.storage.used += (instance.size - original_size)
            instance.storage.save()

        return instance

class StorageSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    available = serializers.FloatField(read_only=True)
    used = serializers.FloatField(read_only=True)

    class Meta:
        model = Storage
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Project
        fields = '__all__'