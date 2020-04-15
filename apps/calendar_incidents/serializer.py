from rest_framework import serializers

from calendar_incidents.models import CalendarIncidents


class SimpleCalendarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarIncidents
        fields = ['id', 'datetime', 'title', 'order']


class CalendarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarIncidents
        fields = "__all__"
