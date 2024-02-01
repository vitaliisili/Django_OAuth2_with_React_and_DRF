import logging

from rest_framework import permissions

logger = logging.getLogger(__name__)


class PostsPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        logger.info('Checking permission for posts')
        if view.action in ['create', 'destroy', 'update', 'partial_update', 'retrieve', 'list']:
            return request.user.is_authenticated
        else:
            return False

    def has_object_permission(self, request, view, obj):
        logger.info("Checking object permission for posts")
        if not request.user.is_authenticated:
            return False

        if view.action in ['retrieve', 'destroy', 'update', 'partial_update']:
            return obj.author == request.user or request.user.is_staff
        else:
            return False

