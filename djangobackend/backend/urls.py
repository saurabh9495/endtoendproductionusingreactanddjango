from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("created/", views.Summary_created.as_view()),
    path("queued/", views.Summary_queued.as_view()),
    path("halt/", views.Summary_halted.as_view()),
    path("running/", views.Summary_running.as_view()),
    path("abort/", views.Summary_abort.as_view()),
    path("deleted/", views.Summary_deleted.as_view()),
    path("successful/", views.Summary_successful.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
