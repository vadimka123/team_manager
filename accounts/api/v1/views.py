from rest_framework import generics, permissions
from rest_framework.authentication import SessionAuthentication
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import JSONWebTokenSerializer, RefreshJSONWebTokenSerializer
from rest_framework_jwt.settings import api_settings
from rest_framework_jwt.views import JSONWebTokenAPIView

from . import serializers
from accounts.models import CustomUser
from accounts.choises import USER_TYPE_TEAM_WORKER


jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class UserListView(generics.ListAPIView):
    authentication_classes = (JSONWebTokenAuthentication, SessionAuthentication,)

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.UserFullSerializer

    def get_queryset(self):
        return CustomUser.objects.filter(account_type=USER_TYPE_TEAM_WORKER)


class ObtainJSONWebToken(JSONWebTokenAPIView):
    """
    API View that receives a POST with a user's username and password.
    Returns a JSON Web Token that can be used for authenticated requests.
    """
    serializer_class = JSONWebTokenSerializer


class UserCreate(generics.CreateAPIView):
    """
    POST /api/v1/account/token/register/
    """
    authentication_classes = (JSONWebTokenAuthentication,
                              SessionAuthentication,)
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = serializers.UserCreateSerializer


class RefreshJSONWebToken(JSONWebTokenAPIView):
    """
    POST /api/v1/account/token/refresh/
    """

    serializer_class = RefreshJSONWebTokenSerializer
