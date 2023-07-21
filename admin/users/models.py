from django.db import models
from products.models import Product, ProductVariant
from django.contrib.auth.models import User

# Create your models here.
GENDER_CHOICES = (
    ('Male', 'Male'),
    ('Female', 'Female'),
)
class Profile(models.Model):
    user        = models.OneToOneField(User,on_delete=models.CASCADE)
    gender      = models.CharField(max_length=10,choices=GENDER_CHOICES,blank=True, null=True)
    phone       = models.CharField(max_length=15)
    image       = models.FileField(upload_to='uploads/users',null=True,blank=True)
    
    def __str__(self):
        return self.user.username
    
    class Meta:
        db_table = 'user_profile'
    

class Useraddress(models.Model):
    user                = models.ForeignKey(User,on_delete=models.CASCADE)
    name                = models.CharField(max_length=30)
    mobile_no           = models.CharField(max_length=15)
    address             = models.TextField()
    pincode             = models.IntegerField()
    country             = models.CharField(max_length=50)
    state               = models.CharField(max_length=50)
    city_district       = models.CharField(max_length=50)
    city                = models.CharField(max_length=50)
    type_of_address     = models.CharField(max_length=10, choices=(("Home","Home"), ("Office","Office")), blank=True, null=True)
    is_default          = models.BooleanField(default=True)
    createdAt           = models.DateTimeField(auto_now_add=True)
    updatedAt           = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'useraddress'
        
    def __str__(self):
        return self.name

class Cart(models.Model):
    user                = models.ForeignKey(User,on_delete=models.CASCADE)
    product             = models.ForeignKey(Product,on_delete=models.CASCADE)
    product_variant     = models.ForeignKey(ProductVariant,on_delete=models.CASCADE)
    qunantity           = models.IntegerField(default=0)
    added_date          = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.first_name
    
    class Meta:
        db_table = 'cart'