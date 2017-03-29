from rest_framework import serializers

from tasks.models import Task
from accounts.models import CustomUser
from accounts.choises import USER_TYPE_TEAM_WORKER
from accounts.api.v1.serializers import UserFullSerializer


class TaskSerializer(serializers.ModelSerializer):
    user_dev = serializers.PrimaryKeyRelatedField(write_only=True, required=False, queryset=CustomUser.objects.filter(
        account_type=USER_TYPE_TEAM_WORKER))

    def to_representation(self, instance):
        result = super(TaskSerializer, self).to_representation(instance)
        if instance.user_dev:
            result['user_dev'] = UserFullSerializer(instance.user_dev).data
        return result

    class Meta:
        model = Task
        fields = ('id', 'user_dev', 'dev_eta', 'status', 'label', 'description',)
        read_only_fields = ('id',)
