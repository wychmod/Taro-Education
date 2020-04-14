from datetime import datetime
from DjangoUeditor.models import UEditorField
from django.db import models
from django.contrib.auth import get_user_model

from courses.models import Courses

User = get_user_model()


class Article(models.Model):
    """
    文章
    """
    title = models.CharField(max_length=255, verbose_name="文章标题", unique=True)
    order = models.IntegerField(default=0, verbose_name="文章优先级")
    add_time = models.DateTimeField(default=datetime.now, verbose_name="创建时间")
    content = UEditorField(verbose_name="内容", imagePath="articles/images/", width=1000, height=300,
                           filePath="articles/files/", default='')
    thumb = models.IntegerField(default=0, verbose_name="点赞数")
    hit_number = models.IntegerField(default=0, verbose_name="点击数")
    author = models.ForeignKey(User, verbose_name="文章作者", on_delete=models.CASCADE)
    course = models.ForeignKey(Courses, verbose_name="有关课程", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "论坛文章"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class ArticleComment(models.Model):
    """
    文章评论
    """
    author = models.ForeignKey(User, verbose_name="评论者作者", on_delete=models.CASCADE)
    content = UEditorField(verbose_name="评论内容", imagePath="articles/images/", width=1000, height=300,
                           filePath="articles/files/", default='')
    add_time = models.DateTimeField(default=datetime.now, verbose_name="评论时间")
    article = models.ForeignKey(Article, verbose_name="评论文章", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "文章评论"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "{} {} 的评论".format(self.article.title, self.author.name)
