from django.contrib import admin

from tasks.models import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ('created', 'user_dev', 'dev_eta', 'status', 'label', 'description',)
    search_fields = ('label',)


admin.site.register(Task, TaskAdmin)
