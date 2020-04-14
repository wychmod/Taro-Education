import xadmin
from .models import CalendarIncidents


class CalendarIncidentsAdmin(object):
    list_display = ["datetime", "title", "order", "creator"]
    list_filter = ["title", "creator"]
    search_fields = ['title', ]


xadmin.site.register(CalendarIncidents, CalendarIncidentsAdmin)

