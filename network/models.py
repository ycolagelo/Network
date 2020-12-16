from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Newposts(models.Model):
    """Models for storing new posts"""
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=False)
    posts = models.CharField(max_length=400, null=False)
    date = models.DateField(auto_now_add=True)
    likes = models.IntegerField(default=0)

    def serialize(self):
        return {
            "id": self.id,
            "username": self.user.username,
            "posts": self.posts,
            "date": self.date.strftime("%b %-d %Y, %-I: %M %P"),
            "likes": self.likes
        }


class Followers(models.Model):
    """stores who the user is following"""
    user = models.ForeignKey(
        User, on_delete=models.PROTECT, null=False, related_name="user")
    follower = models.ForeignKey(
        User, on_delete=models.PROTECT, null=False, related_name='follower')

    def serialize(self):
        return{
            "id": self.id,
            "user": self.user.username,
            "follower": [user.username for user in self.follower.all()]
        }
