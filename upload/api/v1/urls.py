from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.RecheckFileView.as_view()),
    url(r'^preview/$', views.GeneratePreviewView.as_view()),
    url(r'^import/$', views.ImportView.as_view()),
]
