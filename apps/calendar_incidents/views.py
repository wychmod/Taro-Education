from rest_framework import mixins, viewsets, permissions


class CalendarViewset(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):