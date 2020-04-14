from django.db import models
# Create your models here.
from django.contrib.auth import get_user_model
from DjangoUeditor.models import UEditorField
from datetime import datetime

User = get_user_model()


class Courses(models.Model):
    """
    课程
    """
    title = models.CharField(max_length=255,  verbose_name="课程名称")
    is_visible = models.BooleanField(
        default=False,
        verbose_name="是否可见",
        help_text='课程不再被展示',
    )
    show_on_homepage = models.BooleanField(
        verbose_name='是否首页推荐',
        default=False,
        help_text='出现在首页部分',
    )
    order = models.IntegerField(
        verbose_name='首页推荐排序',
        default=0,
        help_text=u'影响出现在首页的顺序',
    )
    title_pic = models.FileField(blank=True, upload_to="course/")
    description = models.TextField(blank=True, null=True)
    teachers = models.ForeignKey(User, verbose_name="老师", on_delete=models.CASCADE)
    browse_times = models.IntegerField(default=0, verbose_name='浏览次数')
    grade = models.IntegerField(default=0, verbose_name='课程评分')
    grade_number = models.IntegerField(default=0, verbose_name='参与评分人数')
    add_time = models.DateTimeField(default=datetime.now, verbose_name="添加时间")
    duration = models.IntegerField(default=120, verbose_name='课程总时长', help_text='课程总时长，单位为分钟')

    class Meta:
        verbose_name = "课程"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class Chapter(models.Model):
    """
    课程章节
    """
    course = models.ForeignKey(Courses, verbose_name="所属课程", on_delete=models.CASCADE)
    title = models.CharField(max_length=255, verbose_name="章节标题")
    order = models.IntegerField(default=0, verbose_name="章节排序")
    type = models.CharField(max_length=255, null=True, blank=True, verbose_name="章节类型")
    details = UEditorField(verbose_name="内容", imagePath="chapters/images/", width=1000, height=300,
                           filePath="chapters/files/", default='')
    add_time = models.DateTimeField(default=datetime.now, verbose_name="添加时间")

    class Meta:
        verbose_name = "课程章节"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "{} 第{}章 {}".format(self.course.title, self.order, self.title)

