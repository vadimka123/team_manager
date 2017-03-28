from rest_framework import serializers

from tasks.models import Task
from accounts.api.v1.serializers import UserFullSerializer


class TaskSerializer(serializers.ModelSerializer):
    user_created = UserFullSerializer()
    user_dev = UserFullSerializer()

    class Meta:
        model = Task
        fields = ('id', 'user_created', 'created', 'user_dev', 'dev_eta', 'status', 'label', 'description',)
        read_only_fields = ('id', 'user_created', 'created',)
