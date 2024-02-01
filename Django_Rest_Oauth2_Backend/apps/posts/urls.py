from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.posts import views

app_name = 'posts'

router = DefaultRouter()
router.register('posts', views.PostViewSet, basename='posts')

urlpatterns = [
    path('', include(router.urls))
]
