
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("post_list", views.post_list, name="post_list"),
    path("new_post", views.new_post, name="new_post"),
    path("user_info", views.user_info, name="user_info"),
    path("profile/<int:user_id>", views.profile, name="profile")
]
