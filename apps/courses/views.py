from rest_framework import mixins, viewsets, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from courses.serializer import SimpleCoursesSerializer, CoursesSerializer, SimpleChaptersSerializer, ChaptersSerializer
from .models import Courses, Chapter


class CoursesViewset(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    课程内容显示
    list:
        首页课程显示列表
    retrieve:
        单个课程详细显示
    """
    queryset = Courses.objects.filter(is_visible=True)

    def get_queryset(self):
        is_show = self.request.GET.get('show_on_homepage')
        if is_show:
            return self.queryset.filter(show_on_homepage=True)
        return self.queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return CoursesSerializer
        return SimpleCoursesSerializer


class ChaptersViewset(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    chapter内容显示
    list:
        默认全部的chapter，?course_id单个课程chapter内容显示
    retrieve:
        单个chapter的详细内容
    """
    queryset = Chapter.objects.all()
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication)

    def get_permissions(self):
        if self.action == "retrieve":
            return [permissions.IsAuthenticated()]
        return []

    def get_queryset(self):
        course_id = self.request.GET.get('course_id')
        if course_id:
            return self.queryset.filter(course_id=course_id).order_by('order')
        return self.queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ChaptersSerializer
        return SimpleChaptersSerializer
