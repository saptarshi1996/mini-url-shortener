import uuid
import environ

from django.core.cache import cache
from django.shortcuts import redirect
from django.db.models import F

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination

from .models import UserUrl
from .serializers import UserUrlSerializer

env = environ.Env()
environ.Env.read_env()


# Custom pagination class.
class UserLinkPagination(PageNumberPagination):
    page_size = 10
    # page_size_query_param = 'page'


# Create your views here.
class ShortnerGetView(APIView):

    def get(self, request, id):

        short_url = request.build_absolute_uri()
        value = cache.get(short_url)

        # if not in cache update in db.
        if not value:
            value = UserUrl.objects.filter(short_url=short_url).first()

        # check in db.
        if value:
            UserUrl.objects.filter(short_url=short_url).update(clicks=F('clicks')+1)
            return redirect(value)

        return redirect(env("NOT_FOUND_URL"))


class ShortnerAPIView(APIView, UserLinkPagination):

    permission_classes = (IsAuthenticated, )

    def post(self, request):

        try:

            if 'value' in request.data and request.data.get('value'):

                base_url = env("PREFIX_URL")
                key = str(uuid.uuid4())[:5]
                value = request.data.get('value')

                # check if this user has this url?
                url_exists_for_user = UserUrl.objects.filter(original_url=value, user=request.user).first()
                if url_exists_for_user:
                    return Response(data={
                        "message": "Done",
                        "url": url_exists_for_user.short_url,
                    }, status=status.HTTP_201_CREATED)

                key_base_url = base_url+key
                cache.set(key_base_url, value, timeout=None)

                # create a record in db.
                UserUrl(
                    user=request.user,
                    original_url=value,
                    short_url=key_base_url,
                ).save()

                # search for this key in cache. 
                return Response(data={
                    "message": "New link generated successfully",
                }, status=status.HTTP_201_CREATED)

            return Response(data={"message": "Missing value"}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response(data={"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get(self, request):

        try:

            user_url = UserUrl.objects.filter(user=request.user).only('id', 'original_url', 'short_url', 'clicks', 'created_at')
            results = self.paginate_queryset(user_url, request, view=self)
            serializer = UserUrlSerializer(results, many=True)
            paginated_result = self.get_paginated_response(serializer.data).data

            return Response(data={
                "message": "User link fetched successfully",
                "result": paginated_result,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ShortnerDetailView(APIView):

    permission_classes = (IsAuthenticated, )

    def get(self, request, id):

        try:

            user_url = UserUrl.objects.filter(id=id).only('id', 'original_url', 'short_url', 'clicks', 'created_at').first()
            serializer = UserUrlSerializer(user_url)

            return Response(data={
                "message": "User url fetched successfully",
                "user_url": serializer.data,
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(data={"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
