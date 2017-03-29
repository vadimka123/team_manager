from django.db import models

from accounts.models import CustomUser
from choises import TASK_STATUSES, TASK_STATUS_TODO


class Task(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user_dev = models.ForeignKey(CustomUser, null=True, related_name='task_dev')
    dev_eta = models.DateField(null=True, blank=False)
    status = models.CharField(max_length=256, choices=TASK_STATUSES, default=TASK_STATUS_TODO)
    label = models.CharField(max_length=256, null=False, blank=False)
    description = models.TextField(max_length=1024, null=True, blank=True)
