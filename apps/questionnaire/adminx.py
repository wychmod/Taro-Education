
import xadmin
from .models import Question, Questionnaire


class QuestionAdmin(object):
    list_display = ["description", "right_key"]
    list_filter = ["description"]
    search_fields = ['description', ]


class QuestionnaireAdmin(object):
    list_display = ["title", "degree", "type", "is_visible", "is_hot"]
    list_filter = ["title", "degree", "type"]
    search_fields = ['title', ]


xadmin.site.register(Questionnaire, QuestionnaireAdmin)
xadmin.site.register(Question, QuestionAdmin)
