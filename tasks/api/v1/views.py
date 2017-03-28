from rest_framework import generics, permissions
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from tasks.api.v1 import serializers
from tasks.models import Task
from accounts.choises import USER_TYPE_TEAM_CHIEF, USER_TYPE_TEAM_LEADER


class TaskListCreateView(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication, SessionAuthentication,)

    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = serializers.TaskSerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user_created=user)

    def get_queryset(self):
        if self.request.user.account_type in (USER_TYPE_TEAM_CHIEF, USER_TYPE_TEAM_LEADER):
            return Task.objects.all().select_related('user_dev')
        else:
            return Task.objects.filter(user_dev=self.request.user).select_related('user_dev')


class TaskUpdateView(generics.UpdateAPIView, TaskListCreateView):
    pass
