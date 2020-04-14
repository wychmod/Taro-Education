from datetime import datetime

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class ChatRoom(models.Model):
    """
    聊天房间
    """
    title = models.CharField(max_length=255, verbose_name="房间名称", unique=True)
    order = models.IntegerField(default=0, verbose_name="聊天房间优先级")
    add_time = models.DateTimeField(default=datetime.now, verbose_name="创建时间")

    class Meta:
        verbose_name = "聊天房间"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title


class ChatContent(models.Model):
    """
    聊天内容
    """
    chat_room = models.ForeignKey(ChatRoom, verbose_name="发送房间", on_delete=models.DO_NOTHING)
    chat_user = models.ForeignKey(User, verbose_name="发送者", on_delete=models.DO_NOTHING)
    chat_content = models.TextField(null=True, blank=True, verbose_name="发送内容")
    add_time = models.DateTimeField(default=datetime.now, verbose_name="发送时间")

    class Meta:
        verbose_name = "聊天内容"
        verbose_name_plural = verbose_name

    def __str__(self):
        return "{} {} {} {}".format(self.chat_room.title, self.chat_user.name, self.chat_content, self.add_time)
