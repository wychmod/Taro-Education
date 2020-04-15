import sys
import os
from django.contrib.auth import get_user_model


pwd = os.path.dirname(os.path.realpath(__file__))
sys.path.append(pwd+"../")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "EducationBackend.settings")
import django
django.setup()
User = get_user_model()
from calendar_incidents.models import CalendarIncidents
from django.utils.timezone import now, timedelta
row_data = [now().date() + timedelta(days=i) for i in range(1, 90)]
user = User()
user.name = '王老师'
user.username = 'wyxuan12345'
user.set_password('123456')
user.save()

for data in row_data:
    calendar = CalendarIncidents()
    calendar.datetime = data
    calendar.title = 'WEB大作业的完成'
    calendar.order = 0
    calendar.details = '在期中考试之前提交web大作业'
    calendar.creator = user
    calendar.save()
