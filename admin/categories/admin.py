from django.contrib import admin
from .models import Category, Subcategory, Childcategory, Banner, Brand
# Register your models here.

admin.site.register(Category)
admin.site.register(Subcategory)
admin.site.register(Childcategory)
admin.site.register(Brand)
admin.site.register(Banner)
