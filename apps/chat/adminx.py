import xadmin
from .models import ChatRoom, ChatContent


class ChatRoomAdmin(object):
    list_display = ["title", "order", "add_time"]


class ChatContentAdmin(object):
    list_display = ["chat_room", "chat_user", "add_time"]
    search_fields = ['chat_user', ]


xadmin.site.register(ChatRoom, ChatRoomAdmin)
xadmin.site.register(ChatContent, ChatContentAdmin)
