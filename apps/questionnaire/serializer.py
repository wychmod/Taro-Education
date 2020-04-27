from rest_framework import serializers

from .models import Questionnaire, Question


class SimpleQuestionnaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questionnaire
        fields = ['id', 'title', 'degree', 'type', 'number', 'people']


class QuestionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Question
        fields = "__all__"


class QuestionnaireSerializer(serializers.ModelSerializer):
    question = QuestionSerializer(many=True)

    class Meta:
        model = Questionnaire
        fields = "__all__"
