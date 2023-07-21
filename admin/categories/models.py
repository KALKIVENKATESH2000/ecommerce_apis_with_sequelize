from django.db import models
from django.contrib.auth.models import User
from .data import STATUS_CHOICES

# Create your models here.


class Category(models.Model):
    name            = models.CharField(max_length=200)
    image            = models.FileField(upload_to='uploads/category')
    published       = models.BooleanField(default=False)
    createdAt    = models.DateTimeField(auto_now_add=True)
    updatedAt    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'categories'
		
class Subcategory(models.Model):
    category        = models.ForeignKey(Category,on_delete=models.CASCADE)
    name            = models.CharField(max_length=200)
    image            = models.FileField(upload_to='uploads/category',null=True,blank=True)
    published       = models.BooleanField(default=False)
    createdAt    = models.DateTimeField(auto_now_add=True)
    updatedAt    = models.DateTimeField(auto_now=True)
    class Meta:
        db_table ="subcategories"

    def __str__(self):
        return self.name

		
class Childcategory(models.Model):
    subcategory     = models.ForeignKey(Subcategory,on_delete=models.CASCADE)
    name            = models.CharField(max_length=200)
    image            = models.FileField(upload_to='uploads/category',null=True,blank=True)
    published       = models.BooleanField(default=False)
    createdAt    = models.DateTimeField(auto_now_add=True)
    updatedAt    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    class Meta:
        db_table ="childcategories"
    
    
class Brand(models.Model):
    category        = models.ManyToManyField(Category)
    name            = models.CharField(max_length=200)
    image            = models.FileField(upload_to='uploads/brands',null=True,blank=True)
    published       = models.BooleanField(default=False)
    createdAt    = models.DateTimeField(auto_now_add=True)
    updatedAt    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    class Meta:
        db_table ="brands"
    
class Banner(models.Model):
    title           = models.CharField(max_length=200,null=True,blank=True)
    image            = models.FileField(upload_to='uploads/banners')
    published       = models.BooleanField(default=False)
    createdAt    = models.DateTimeField(auto_now_add=True)
    updatedAt    = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    class Meta:
        db_table ="banners"