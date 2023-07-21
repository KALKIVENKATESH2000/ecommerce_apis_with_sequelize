from django.contrib import admin
from .models import Order, OrderProducts
# Register your models here.

class OrderAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in Order._meta.fields ]
admin.site.register(Order, OrderAdmin)

class OrderProductsAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in OrderProducts._meta.fields ]
admin.site.register(OrderProducts, OrderProductsAdmin)