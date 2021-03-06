from django.contrib import admin

from accounts.models import CustomUser


class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username', 'account_type',)
    search_fields = ('username',)


admin.site.register(CustomUser, CustomUserAdmin)
