from django.contrib import admin
from .models import Profile, Useraddress, Cart
# Register your models here.

class ProfileAdmin(admin.ModelAdmin):
    list_display =  [f.name for f in Profile._meta.get_fields()]
admin.site.register(Profile, ProfileAdmin)


class UseraddressAdmin(admin.ModelAdmin):
    list_display =  [f.name for f in Useraddress._meta.get_fields()]
admin.site.register(Useraddress, UseraddressAdmin)


class CartAdmin(admin.ModelAdmin):
    list_display =  [f.name for f in Cart._meta.get_fields()]
admin.site.register(Cart, CartAdmin)