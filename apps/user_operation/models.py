from datetime import datetime
from django.contrib.auth import get_user_model
from django.db import models

from courses.models import Courses

User = get_user_model()


class UserFav(models.Model):
    """
    用户收藏
    """
    user = models.ForeignKey(User, verbose_name="用户", on_delete=models.CASCADE)
    courses = models.ForeignKey(Courses, verbose_name="课程", help_text="课程id", on_delete=models.CASCADE)
    add_time = models.DateTimeField(default=datetime.now, verbose_name=u"添加时间")

    class Meta:
        verbose_name = '用户收藏'
        verbose_name_plural = verbose_name
        unique_together = ("user", "courses")

    def __str__(self):
        return self.user.name
