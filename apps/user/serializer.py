from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'username', 'head_portrait']


class UserDetailSerializer(serializers.ModelSerializer):
    """
    用户详情序列化类
    """
    class Meta:
        model = User
        fields = ("name", "gender", "birthday", "email", "mobile", "head_portrait", "school", "grade", "integral", "sign")


class UserRankSerializer(serializers.ModelSerializer):
    """
    用户积分排名序列化类
    """
    class Meta:
        model = User
        fields = ['name', 'username', 'head_portrait', 'integral']
