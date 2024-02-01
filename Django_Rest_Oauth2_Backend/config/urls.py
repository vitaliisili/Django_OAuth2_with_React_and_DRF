from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('api/profile/', include('apps.user.urls')),
    path('api/blog/', include('apps.posts.urls')),
]
