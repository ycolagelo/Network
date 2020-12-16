from django.contrib import admin

from .models import Newposts, Followers

# Register your models here.


class NewpostsAdmin(admin.ModelAdmin):
    list_display = ("user", "posts", "date", "likes")


class FollowerAdmin(admin.ModelAdmin):
    list_display = ("user", "follower")


admin.site.register(Newposts, NewpostsAdmin)
admin.site.register(Followers, FollowerAdmin)
