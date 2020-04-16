"""EducationBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include
import xadmin
from rest_framework.documentation import include_docs_urls
from xadmin.plugins import xversion
from django.views.static import serve
from rest_framework_jwt.views import obtain_jwt_token

from calendar_incidents.views import CalendarViewset
from courses.views import CoursesViewset, ChaptersViewset
from user.views import UserViewset
from .settings import MEDIA_ROOT
from rest_framework.routers import DefaultRouter
xadmin.autodiscover()
# version模块自动注册需要版本控制的 Model

xversion.register_models()
router = DefaultRouter()
router.register('courses', CoursesViewset, basename="courses")
router.register('chapter', ChaptersViewset, basename="chapter")
router.register('calendar', CalendarViewset, basename="calendar")
router.register('user', UserViewset, basename="user")

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', xadmin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    re_path(r'^media/(?P<path>.*)', serve, {"document_root": MEDIA_ROOT}),
    path('ueditor/', include('DjangoUeditor.urls' )),
    path('doc/', include_docs_urls(title="wychmod学习后台")),
    path('login/', obtain_jwt_token),
]
