from django.contrib import admin
from .models import *

class StorageAdmin(admin.ModelAdmin):
    readonly_fields = ['used']

admin.site.register(UserProfile)
admin.site.register(Storage,StorageAdmin)
admin.site.register(Media)
admin.site.register(Project)