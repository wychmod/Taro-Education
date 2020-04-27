from rest_framework import mixins, viewsets

from questionnaire.serializer import SimpleQuestionnaireSerializer, QuestionnaireSerializer
from .models import Questionnaire


class QuestionnaireViewset(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    问卷查询
    list:
        所有问卷的简单返回t
    retrieve:
        单个问卷详细显示
    """
    queryset = Questionnaire.objects.filter(is_visible=True)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return QuestionnaireSerializer
        return SimpleQuestionnaireSerializer

