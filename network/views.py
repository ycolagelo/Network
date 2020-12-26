from django.shortcuts import render
from django.http import JsonResponse
from .models import Newposts, Followers
from django.views.decorators.csrf import csrf_exempt
import json


def index(request):
    return render(request, "network/index.html")


@csrf_exempt
def new_post(request):
    """stores a new post into json"""
    if request.method == "POST":
        data = json.loads(request.body)
        post = Newposts(
            user=request.user,
            posts=data['posts'],
        )
        post.save()
        return JsonResponse(post.serialize(), status=201)


def post_list(request):
    """returns the posts in the database"""
    # posts = serializers.serialize("json", Newposts.objects.all())
    posts = Newposts.objects.all()
    posts = posts.order_by("-date").all()

    return JsonResponse([post.serialize() for post in posts], safe=False)


def user_info(request):
    if request.user.is_authenticated:
        return JsonResponse(request.user.serialize(), safe=False)
    return JsonResponse(None, safe=False)
