from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import json
from .models import User
from .models import Newposts, Followers
from django.http import JsonResponse
from django.core import serializers


def index(request):
    return render(request, "network/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")


def new_post(request):
    """stores a new post into json"""
    if request.method == "POST":
        Newposts(
            user=request.user,
            post=request.POST["post-info"]
        )
        Newposts.save()
    return JsonResponse({"message": "post is successful."}, status=201)


def post_list(request):
    """returns the posts in the database"""
    # posts = serializers.serialize("json", Newposts.objects.all())
    posts = Newposts.objects.all()
    posts = posts.order_by("-date").all()

    if not posts:
        return JsonResponse({"error": "No data found"}, status=400)

    return JsonResponse([post.serialize() for post in posts], safe=False)
