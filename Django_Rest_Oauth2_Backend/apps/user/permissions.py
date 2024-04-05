import logging

from rest_framework import permissions

logger = logging.getLogger(__name__)


class UserPermission(permissions.BasePermission):
    """Custom permission class for user-related actions.
    Methods:
        has_permission: Checks if the user has permission for the requested action.
        has_object_permission: Checks if the user has permission for the requested object action.
    """

    def has_permission(self, request, view):
        """Checks if the user has permission for the requested action.
        Args:
            request (HttpRequest): The request object.
            view (APIView): The view object associated with the action.
        Returns:
            bool: True if the user has permission, False otherwise.
        """

        logger.info('Checking user permission')
        logger.info(f'Action is {view.action} and method is {request.method}')

        if view.action == 'list':
            return request.user.is_authenticated and request.user.is_staff
        elif view.action in ['create',
                             'reset_password',
                             'reset_password_confirm',
                             'github_callback',
                             'microsoft_callback']:
            return True
        elif view.action == 'destroy':
            return request.user.is_authenticated
        elif view.action in ['retrieve', 'update', 'partial_update', 'me', 'change_password']:
            return request.user.is_authenticated
        else:
            return False

    def has_object_permission(self, request, view, obj):
        """Checks if the user has permission for the requested object action.
        Args:
            request (HttpRequest): The request object.
            view (APIView): The view object associated with the action.
            obj: The object related to the action.
        Returns:
            bool: True if the user has permission, False otherwise.
        """

        logger.info('Checking user permission')
        logger.info(f'Action is {view.action}')
        logger.info(f'obj is {obj.__class__}')

        if not request.user.is_authenticated:
            return False
        if view.action in ['retrieve', 'destroy']:
            return obj == request.user or request.user.is_staff
        elif view.action in ['update', 'partial_update']:
            return obj == request.user or request.user.is_staff
        elif view.action == 'me':
            return obj == request.user
        elif view.action in ['reset_password', 'reset_password_confirm', 'github_callback']:
            return True
        elif view.action == 'change_password':
            return obj == request.user or request.user.is_staff
        else:
            return False
