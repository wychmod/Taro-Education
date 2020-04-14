from django.contrib.auth import get_user_model
from django.db import models
from datetime import datetime

User = get_user_model()


class CalendarIncidents(models.Model):
    """
    日历事件
    """
    datetime = models.DateTimeField(default=datetime.now, verbose_name="日历事件")
    title = models.CharField(max_length=255, verbose_name="事件标题")
    order = models.IntegerField(default=0, verbose_name="事件优先级")
    details = models.TextField(verbose_name="内容", null=True, blank=True)
    creator = models.ForeignKey(User, verbose_name="创建事件者", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "日历事件"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "{}{}".format(self.datetime, self.title)
