from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.TaskListCreateView.as_view()),
    url(r'^(?P<pk>\d+)/$', views.TaskUpdateView.as_view()),
]
