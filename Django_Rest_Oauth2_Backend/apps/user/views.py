import logging

import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from apps.core.utils import Validate
from apps.user.permissions import UserPermission
from apps.user.serializers import BaseUserSerializer, RegisterUserSerializer

logger = logging.getLogger(__name__)

class UserViewSet(viewsets.ModelViewSet):
    """API endpoint for managing user accounts."""

    queryset = get_user_model().objects.all()
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = (UserPermission,)
    search_fields = ['$name']
    ordering_fields = ['name', 'created_at']
    ordering = ['-created_at']
    serializer_class = BaseUserSerializer

    def create(self, request, *args, **kwargs):
        """Creates a new user account."""

        password = request.data.get('password')
        Validate.password_validation(password)

        serializer = RegisterUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        get_user_model().objects.create_user(**serializer.data)
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)

    @action(detail=False)
    def me(self, request):
        """Retrieves the current user's account details."""

        user_serializer = BaseUserSerializer(request.user)
        return Response(user_serializer.data, status=200)

    @action(methods=['POST'], detail=False, url_path='github')
    def github_callback(self, request):
        data = request.data
        code = data.get('code')

        try:
            response = requests.post('https://github.com/login/oauth/access_token', data={
                'client_id': settings.SOCIAL_AUTH_GITHUB_KEY,
                'client_secret': settings.SOCIAL_AUTH_GITHUB_SECRET,
                'redirect_uri': settings.GITHUB_REDIRECT_URL,
                'code': code
            }, headers={'Accept': 'application/json'})
            return Response(response.json(), status=status.HTTP_200_OK)
        except Exception as e:
            logger.error("Request failed:", str(e))
        return Response(status=status.HTTP_400_BAD_REQUEST)
