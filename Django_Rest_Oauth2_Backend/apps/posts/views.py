from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework import viewsets, status
from rest_framework.response import Response
from apps.posts.models import Posts
from apps.posts.permissions import PostsPermission
from apps.posts.serializers import PostsSerializer, CreatePostSerializer


class PostViewSet(viewsets.ModelViewSet):
    """ A Viewset for managing posts.

    Attributes:
        queryset (QuerySet): The queryset of all posts.
        serializer_class (Serializer): The serializer class for posts.
        permission_classes (tuple): The permission classes required for accessing posts.
        search_fields (list): The fields to be searched for posts.
        ordering_fields (list): The fields to be used for ordering posts.
        ordering (str): The default ordering for posts.
    """

    serializer_class = PostsSerializer
    permission_classes = (PostsPermission,)
    search_fields = ['$title']
    ordering_fields = ['title', 'created_at']
    ordering = ['-created_at']

    def get_queryset(self):
        if self.request.user.is_staff:
            return Posts.objects.all()
        return Posts.objects.filter(author=self.request.user)

    def create(self, request, *args, **kwargs):
        request.data['author'] = request.user.id
        serializer = CreatePostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(serializer.data, status=status.HTTP_201_CREATED)