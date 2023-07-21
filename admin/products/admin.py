from django.contrib import admin
from .models import Product, ProductVariant, Review, FavouriteProduct
# Register your models here.

class ProductAdmin(admin.ModelAdmin):
    # list_display =  [f.name for f in Product._meta.get_fields()]
    list_display =  [field.name for field in Product._meta.fields ]
admin.site.register(Product, ProductAdmin)

class ProductVariantAdmin(admin.ModelAdmin):
    # list_display =  [f.name for f in ProductVariant._meta.get_fields()]
    list_display = [field.name for field in ProductVariant._meta.fields ]
admin.site.register(ProductVariant, ProductVariantAdmin)

class ReviewAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in Review._meta.fields ]
admin.site.register(Review, ReviewAdmin)

class FavourateProductAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in FavouriteProduct._meta.fields ]
admin.site.register(FavouriteProduct, FavourateProductAdmin)