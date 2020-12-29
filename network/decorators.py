from functools import wraps
from django.http import JsonResponse


def ajax_login_required(view_function):
    @wraps(view_function)
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            return view_function(request, *args, **kwargs)
        return JsonResponse({'message': 'login required'}, status=401)
    return wrapper
