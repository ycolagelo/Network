
from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("post_list", views.post_list, name="post_list"),
    path("new_post", views.new_post, name="new_post"),
    path("user_info", views.user_info, name="user_info"),
    path("profile/<str:username>", views.profile, name="profile"),
    path("is_following/<str:username>", views.is_following, name="is_following"),
    path("update_followers", views.update_followers, name="update_followers"),
    path("following_posts", views.following_posts, name="following_posts"),
    path("edit_post/<int:post_id>", views.edit_post, name="edit_post"),
    path("like_post/<int:post_id>", views.like_post, name="like_post"),
    path("unlike_post/<int:post_id>", views.unlike_post, name="unlike_post"),
    path("numb_likes", views.numb_likes, name="numb_likes")
]
