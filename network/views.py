import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from .models import Newposts, Followers, serialize_array, User
from .decorators import ajax_login_required


def index(request):
    return render(request, "network/index.html")


@ajax_login_required
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


def profile(request, username):
    """loads the profile page for the user"""
    user = User.objects.get(username=username)

    followers = Followers.objects.filter(following=user).all()
    following = Followers.objects.filter(user=user).all()
    own_posts = Newposts.objects.filter(user=user).all()

    return JsonResponse({'followers': serialize_array(followers),
                         "following": serialize_array(following),
                         'posts': serialize_array(own_posts),
                         'user': user.serialize()},
                        safe=False)


#
# TODO: Unique constraint in the models for (user, following)
#

def is_following(request, username):
    is_following = Followers.objects.filter(
        user=request.user, following__username=username).count() == 1

    return JsonResponse({'is_following': is_following}, safe=False)


def follow(request, username):

    if request.mothod == "POST":

        new_following = Followers(
            user=request.user,
            following=username
        )
        new_following.save()
        return JsonResponse({"message": 'following was successful'}, safe=False)


def unfollow(request, username):

    if request.method == "POST":

        Followers.objects.filter(
            user=request.user, following__username=username).delete()

        return JsonResponse({"message": " item deleted successfully"}, safe=False)
