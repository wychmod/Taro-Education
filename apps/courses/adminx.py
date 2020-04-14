import xadmin
from .models import Courses, Chapter


class CoursesAdmin(object):
    list_display = ["title", "is_visible", "show_on_homepage", "add_time", "order", "teachers"]
    list_filter = ["teachers", "is_visible", "title"]
    search_fields = ['title', ]


class ChapterAdmin(object):
    list_display = ["course", "title", "order", "type", "add_time"]
    list_filter = ["course", "type", "title"]
    search_fields = ['title', ]
    style_fields = {"details": "ueditor"}


xadmin.site.register(Courses, CoursesAdmin)
xadmin.site.register(Chapter, ChapterAdmin)
