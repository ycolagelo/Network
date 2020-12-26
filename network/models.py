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


class Newposts(models.Model):
    """Models for storing new posts"""
    user = models.ForeignKey(User, on_delete=models.PROTECT, null=False)
    posts = models.CharField(max_length=400, null=False)
    date = models.DateTimeField(auto_now_add=True)
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
