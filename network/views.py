import json
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from django.http import JsonResponse
from .models import Newposts, Followers, serialize_array, User, Likes
from .decorators import ajax_login_required

DEFAULT_PAGE_SIZE = 10


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
        return JsonResponse(post.serialize_with_userinfo(request.user), status=201)


def post_list(request):
    """returns the posts in the database"""
    limit = int(request.GET.get('limit', default=DEFAULT_PAGE_SIZE))
    offset = int(request.GET.get('offset', default=0))

    posts = Newposts.objects.all()
    count = posts.count()
    posts = posts.order_by("-date")[offset:limit + offset]

    responseObj = {}
    responseObj['data'] = [post.serialize() for post in posts]
    responseObj['count'] = count
    return JsonResponse(responseObj, safe=False)


def user_info(request):
    if request.user.is_authenticated:
        return JsonResponse(request.user.serialize(), safe=False)
    return JsonResponse(None, safe=False)


@ajax_login_required
def profile(request, username):
    """loads the profile page for the user"""
    user = User.objects.get(username=username)

    followers = Followers.objects.filter(following=user).all()
    following = Followers.objects.filter(user=user).all()
    own_posts = Newposts.objects.filter(user=user).all().order_by("-date")

    return JsonResponse({'followers': serialize_array(followers),
                         "following": serialize_array(following),
                         'posts': [post.serialize_with_userinfo(request.user) for post in own_posts],
                         'user': user.serialize()},
                        safe=False)


#
# TODO: Unique constraint in the models for (user, following)
#
@ajax_login_required
def is_following(request, username):
    is_following = Followers.objects.filter(
        user=request.user, following__username=username).count() == 1

    return JsonResponse({'is_following': is_following}, safe=False)


@ajax_login_required
@csrf_exempt
def update_followers(request):

    if request.method == "POST":
        data = json.loads(request.body)
        following_user = User.objects.get(username=data["following"])
        new_entry = Followers(
            following=following_user,
            user=request.user
        )
        new_entry.save()
        return JsonResponse({"Message": "Saved Successfully"}, status=200)
    if request.method == "DELETE":
        data = json.loads(request.body)
        try:
            following = Followers.objects.get(
                user=request.user, following__username=data["following"])
        except Followers.DoesNotExist:
            return JsonResponse({"Error": "This person does not exist."}, status=404)
        if data.get("following") is not None:
            following.delete()
        return JsonResponse({"Message": "Deleted Successfully"}, status=200)


@ajax_login_required
def following_posts(request):
    me_following = Followers.objects.filter(user=request.user).all()
    following_users = [f.following for f in me_following]

    # following_users = []
    # for f in me_following:
    #     following_users.append(f.following)

    following_posts = Newposts.objects.filter(
        user__in=following_users).all()

    return JsonResponse(serialize_array(following_posts), safe=False)


@csrf_exempt
@ajax_login_required
def edit_post(request, post_id):
    if request.method == "PATCH":
        post = Newposts.objects.get(pk=post_id, user=request.user)
        data = json.loads(request.body)
        post.posts = data["posts"]

        post.save()

        return JsonResponse(post.serialize_with_userinfo(request.user), safe=False)


@csrf_exempt
@ajax_login_required
def like_post(request, post_id):
    if request.method == "POST":
        likes = Likes.objects.filter(post_id=post_id, user=request.user)
        if likes.count() > 0:
            return JsonResponse("user already liked this post", safe=False, status=400)

        new_like = Likes()
        new_like.user = request.user
        new_like.post_id = post_id
        new_like.save()

        post = Newposts.objects.get(pk=post_id)
        return JsonResponse(post.serialize_with_userinfo(request.user), safe=False)


@csrf_exempt
@ajax_login_required
def unlike_post(request, post_id):
    if request.method == "DELETE":
        unlike = Likes.objects.filter(post_id=post_id, user=request.user)
        if unlike.count() <= 0:
            return JsonResponse("user already unliked this post", safe=False)

        unlike.delete()
        post = Newposts.objects.get(pk=post_id)
        return JsonResponse(post.serialize_with_userinfo(request.user), safe=False)


@ajax_login_required
def numb_likes(request):
    likes = Likes.objects.all().count()
    return JsonResponse(likes, safe=False)
