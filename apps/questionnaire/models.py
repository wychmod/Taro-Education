from django.db import models


class Question(models.Model):
    """
    问卷问题
    """
    description = models.TextField(verbose_name="问题题目")
    right_key = models.CharField(max_length=2, verbose_name="问题答案")
    key_a = models.CharField(max_length=255, verbose_name="选项a")
    key_b = models.CharField(max_length=255, verbose_name="选项b")
    key_c = models.CharField(max_length=255, verbose_name="选项c")
    key_d = models.CharField(max_length=255, verbose_name="选项d")

    class Meta:
        verbose_name = "问题"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.description


class Questionnaire(models.Model):
    """
    问卷
    """
    DEGREE_TYPE = (
        (1, "简单"),
        (2, "中等"),
        (3, "困难"),
    )
    PAY_TYPE = (
        (1, "免费"),
        (2, "会员"),
    )
    title = models.CharField(max_length=255, verbose_name="问卷名称")
    description = models.TextField(blank=True, null=True, verbose_name="问卷介绍")
    degree = models.IntegerField(choices=DEGREE_TYPE, default=1, verbose_name="难度", help_text="难度")
    type = models.IntegerField(choices=PAY_TYPE, default=1, verbose_name="类型", help_text="类型")
    number = models.IntegerField(default=4, verbose_name="题目数量", help_text="题目数量")
    people = models.IntegerField(default=0, verbose_name="完成人数", help_text="完成人数")
    question = models.ManyToManyField(Question)
    is_hot = models.BooleanField(
        default=False,
        verbose_name="是否火热",
        help_text='首页是否被展示',
    )
    is_visible = models.BooleanField(
        default=False,
        verbose_name="是否可见",
        help_text='课程不再被展示',
    )

    class Meta:
        verbose_name = "问卷"
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.title
