from django.contrib import admin

from .models import Newposts, Followers, Likes

# Register your models here.


class NewpostsAdmin(admin.ModelAdmin):
    list_display = ("user", "posts", "date")


class FollowerAdmin(admin.ModelAdmin):
    list_display = ("user", "following")


class LikesAdmin(admin.ModelAdmin):
    list_display = ("user", "post", "like", "unlike")


admin.site.register(Newposts, NewpostsAdmin)
admin.site.register(Followers, FollowerAdmin)
admin.site.register(Likes, LikesAdmin)
