from rest_framework import mixins, viewsets, permissions

from calendar_incidents.models import CalendarIncidents
from calendar_incidents.serializer import CalendarsSerializer, SimpleCalendarsSerializer


class CalendarViewset(mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    """
    日历事件查询
    list:
        所有日历事件
    retrieve:
        单个日历事件详细显示
    """
    queryset = CalendarIncidents.objects.all()

    def get_queryset(self):
        date = self.request.GET.get('date')
        if date:
            datetime = [int(x) for x in date.split('-')]
            if len(datetime) == 3:
                return self.queryset.filter(datetime__year=datetime[0], datetime__month=datetime[1], datetime__day=datetime[2])
            else:
                return self.queryset
        return self.queryset

    def get_serializer_class(self):
        if self.action == "retrieve":
            return CalendarsSerializer
        return SimpleCalendarsSerializer

