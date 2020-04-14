from rest_framework import serializers

from courses.models import Courses, Chapter
from user.serializer import TeacherSerializer


class CoursesSerializer(serializers.ModelSerializer):
    teachers = TeacherSerializer()

    class Meta:
        model = Courses
        fields = "__all__"


class SimpleCoursesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Courses
        fields = ['id', 'title', 'order', 'show_on_homepage', 'title_pic']


class ChaptersSerializer(serializers.ModelSerializer):
    course = CoursesSerializer()

    class Meta:
        model = Chapter
        fields = "__all__"


class SimpleChaptersSerializer(serializers.ModelSerializer):

    class Meta:
        model = Chapter
        fields = ['id', 'course', 'title', 'type', 'order']
