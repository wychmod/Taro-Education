import xadmin
from .models import ArticleComment, Article


class ArticleAdmin(object):
    list_display = ["title", "order", "thumb", "add_time", "course", "author"]
    list_filter = ["author", "course", "title"]
    search_fields = ['title', ]
    style_fields = {"content": "ueditor"}


class ArticleCommentAdmin(object):
    list_display = ["author", "article", "add_time"]
    list_filter = ["author", "article"]
    search_fields = ['article', ]
    style_fields = {"content": "ueditor"}


xadmin.site.register(Article, ArticleAdmin)
xadmin.site.register(ArticleComment, ArticleCommentAdmin)
