from datetime import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class UserProfile(AbstractUser):
    """
    用户
    """
    GRADE_TYPE = (
        (1, "大学一年级"),
        (2, "大学二年级"),
        (3, "大学三年级"),
        (4, "大学四年级"),
    )
    name = models.CharField(max_length=30, null=True, blank=True, verbose_name="姓名")
    birthday = models.DateField(null=True, blank=True, verbose_name="出生年月")
    gender = models.CharField(max_length=6, choices=(("male", u"男"), ("female", "女")), default="female", verbose_name="性别")
    mobile = models.CharField(null=True, blank=True, max_length=11, verbose_name="电话")
    email = models.EmailField(max_length=100, null=True, blank=True, verbose_name="邮箱")
    is_teacher = models.BooleanField(default=False, verbose_name="是否为老师")
    head_portrait = models.ImageField(max_length=200, blank=True, upload_to="head_portrait/", verbose_name="头像",
                                      help_text="头像",
                                      default="head_portrait/v2-97573b50437aac7ae71b73de012470ef_720w.jpg")
    school = models.CharField(max_length=20, null=True, blank=True, verbose_name="学校")
    grade = models.IntegerField(choices=GRADE_TYPE, default=1, verbose_name="年级", help_text="年级")

    class Meta:
        verbose_name = "用户"
        verbose_name_plural = verbose_name

    def __str__(self):
        if self.name:
            return self.name
        return self.username


class VerifyCode(models.Model):
    """
    短信验证码
    """
    code = models.CharField(max_length=10, verbose_name="验证码")
    mobile = models.CharField(max_length=11, verbose_name="电话")
    add_time = models.DateTimeField(default=datetime.now, verbose_name="添加时间")

    class Meta:
        verbose_name = "短信验证码"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.code
