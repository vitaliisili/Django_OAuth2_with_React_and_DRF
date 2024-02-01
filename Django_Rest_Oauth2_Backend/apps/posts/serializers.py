from rest_framework import serializers
from apps.posts.models import Posts
from apps.user.serializers import BaseUserSerializer
import logging

logger = logging.getLogger(__name__)


class PostsSerializer(serializers.ModelSerializer):
    author = BaseUserSerializer(read_only=True)

    class Meta:
        model = Posts
        fields = ['id', 'title', 'message', 'author', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at', 'author']

    def to_representation(self, instance):
        """Converts the author field to a serialized representation of the user object."""
        representation = super().to_representation(instance)
        author_data = BaseUserSerializer(instance.author).data
        representation['author'] = author_data
        return representation


class CreatePostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Posts
        fields = ['title', 'message', 'author']

    def to_representation(self, instance):
        """Converts the author field to a serialized representation of the user object."""
        representation = super().to_representation(instance)
        author_data = BaseUserSerializer(instance.author).data
        representation['author'] = author_data
        return representation
