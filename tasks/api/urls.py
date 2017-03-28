from django.conf.urls import url, include

urlpatterns = [
    url(r'^v1/tasks/', include('tasks.api.v1.urls')),
]
