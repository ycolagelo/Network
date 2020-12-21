from django.shortcuts import render
from django.http import JsonResponse
from .models import Newposts, Followers


def index(request):
    return render(request, "network/index.html")


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


def user_info(request):
    if request.user.is_authenticated:
        return JsonResponse(request.user.serialize(), safe=False)
    return JsonResponse(None, safe=False)
