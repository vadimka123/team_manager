from django.conf.urls import url, include

urlpatterns = [
    url(r'^v1/upload/', include('upload.api.v1.urls')),
]
