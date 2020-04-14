
import xadmin
from .models import UserFav


class UserFavAdmin(object):
    list_display = ['user', 'courses', "add_time"]


xadmin.site.register(UserFav, UserFavAdmin)
