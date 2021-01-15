from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            "full_name": self.get_full_name()
        }


def serialize_array(objects):
    return [u.serialize() for u in objects]


class Newposts(models.Model):
    """Models for storing new posts"""
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=False)
    posts = models.CharField(max_length=400, null=False)
    date = models.DateTimeField(auto_now_add=True)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user.username,
            "posts": self.posts,
            "date": self.date.strftime("%b %-d %Y, %-I: %M %P"),
            "likes": self.likes.count()
        }

    def serialize_with_userinfo(self, user):
        is_liked = self.likes.filter(user=user).count() > 0
        obj = self.serialize()
        obj['liked_by_me'] = is_liked
        return obj

    def __str__(self):
        return f"{self.posts}"


class Followers(models.Model):
    """stores who the user is following"""
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, null=False, related_name="user")
    following = models.ForeignKey(
        User, on_delete=models.PROTECT, related_name='following')

    def serialize(self):
        return{
            "id": self.id,
            "user": self.user.username,
            "following": self.following.username,
        }


class Likes(models.Model):
    """Keeps track of the likes and the unlikes"""
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, null=False,
    )
    post = models.ForeignKey(
        Newposts, on_delete=models.PROTECT, null=False, related_name="likes"
    )

    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "post_id": self.post.id
        }
