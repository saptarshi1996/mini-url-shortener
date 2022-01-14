import uuid
import environ

from django.core.cache import cache
from django.shortcuts import redirect

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

env = environ.Env()
environ.Env.read_env()


# Create your views here.
class ShortnerGetView(APIView):

    def get(self, request, id):
        value = cache.get(request.build_absolute_uri())
        if value:
            return redirect(value)
        else:
            return Response(data={"message": "Missing credentials"}, status=status.HTTP_400_BAD_REQUEST)


class ShortnerPostView(APIView):

    def post(self, request):

        try:

            if 'value' in request.data:

                base_url = env("PREFIX_URL")
                key = str(uuid.uuid4())
                key_base_url, value = base_url+key, request.data.get('value')
                cache.set(key_base_url, value, timeout=None)

                # search for this key in cache. 
                return Response(data={
                    "message": "Done",
                    "url": key_base_url,
                }, status=status.HTTP_201_CREATED)

            return Response(data={"message": "Missing credentials"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:

            print(e)
            return Response(data={"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
