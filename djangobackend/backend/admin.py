from django.contrib import admin
from .models import ADMIN_REGISTRATION

# Register your models here.
for cls in ADMIN_REGISTRATION:
    admin.site.register(cls)
