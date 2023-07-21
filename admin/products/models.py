from django.db import models
from categories.models import Category, Subcategory, Childcategory, Brand
from django.contrib.auth.models import User

# Create your models here.


class Product(models.Model):
    title           = models.CharField(max_length = 400)
    description     = models.TextField()
    richDescription = models.CharField(max_length=200)
    image           = models.FileField(upload_to='uploads/products')
    images           = models.FileField(upload_to='uploads/products',null=True,blank=True)
    countInStock     = models.IntegerField(default=0)
    rating           = models.DecimalField(max_digits = 5, decimal_places = 2, default=0)
    numReviews       = models.IntegerField(default=0)
    reviews          = models.CharField(max_length=400)
    isFeatured      = models.BooleanField(default=False)
    isPopular      = models.BooleanField(default=True)
    category        = models.ForeignKey(Category,on_delete=models.CASCADE)
    subcategory     = models.ForeignKey(Subcategory,on_delete=models.CASCADE,null=True,blank=True)
    childcategory   = models.ForeignKey(Childcategory,on_delete=models.CASCADE,null=True,blank=True)
    brand           = models.ForeignKey(Brand,on_delete=models.CASCADE,null=True,blank=True)
    published       = models.BooleanField(default=True)
    createdAt    = models.DateTimeField(auto_now_add=True)
    updatedAt    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    class Meta:
        db_table = 'products'
    
class ProductVariant(models.Model):
    product         = models.ForeignKey(Product,on_delete=models.CASCADE)
    variantName     = models.CharField(max_length=50)
    color           = models.CharField(max_length=50)
    image           = models.FileField(upload_to='uploads/products',null=True,blank=True)
    originalPrice   = models.IntegerField()
    offerPrice      = models.IntegerField()
    available       = models.IntegerField(default=0)
    createdAt       = models.DateTimeField(auto_now_add=True)
    updatedAt       = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product.title+' ' 'variant name of' ' '+self.variantName
    class Meta:
        db_table = 'product_variants'
    
class Review(models.Model):
    product         = models.ForeignKey(Product,on_delete=models.CASCADE)
    user            = models.ForeignKey(User,on_delete=models.CASCADE)
    reviewText      = models.TextField()
    rating          = models.IntegerField(default=0)
    published       = models.BooleanField(default=True)
    createdAt       = models.DateTimeField(auto_now_add=True)
    updatedAt       = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.first_name
    class Meta:
        db_table = 'reviews'
        
        
class FavouriteProduct(models.Model):
    product         = models.ForeignKey(Product,on_delete=models.CASCADE)
    user            = models.ForeignKey(User,on_delete=models.CASCADE)
    createdAt       = models.DateTimeField(auto_now_add=True)
    updatedAt       = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product.title
    class Meta:
        db_table = 'favourite_products'