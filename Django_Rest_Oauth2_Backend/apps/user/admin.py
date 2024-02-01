from django.contrib import admin
from apps.user.models import User


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('email', 'name', 'is_staff', 'is_active')


admin.site.register(User, CustomUserAdmin)