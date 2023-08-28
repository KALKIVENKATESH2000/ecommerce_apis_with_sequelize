from django.db import models
from django.contrib.auth.models import User
from users.models import Useraddress
from products.models import Product, ProductVariant
# Create your models here.
PAYMENT_MODE = (
    ('cod', 'COD'),
    ('online', 'ONLINE')
)

Paym_STATUSES = (
    ('Pending', 'Pending'),
    ('Success', 'Success'),
    ('Failed', 'Failed'),
)

ORD_STATUSES = (
    ('Pending', 'Pending'),
    ('Cancelled','Cancelled'),
    ('Accepted', 'Accepted'),
    ('Processing', 'Processing'),
    ('Delivered','Delivered')
)
class Order(models.Model):
    user             = models.ForeignKey(User,on_delete=models.CASCADE)
    address          = models.ForeignKey(Useraddress,on_delete=models.CASCADE)
    payment_mode     = models.CharField(max_length=15,choices=PAYMENT_MODE,default='Processing')
    payment_status   = models.CharField(max_length=15,choices=Paym_STATUSES,default='Processing')
    order_status     = models.CharField(max_length=15,choices=ORD_STATUSES,default='Pending')
    taxAmount        = models.DecimalField(default=0,max_digits=20,decimal_places=2)
    totalAmount      = models.DecimalField(default=0,max_digits=20,decimal_places=2)
    finalAmount      = models.DecimalField(default=0,max_digits=20,decimal_places=2)
    delivery_charge  = models.DecimalField(default=0,max_digits=20,decimal_places=2)
    packing_charge   = models.DecimalField(default=0,max_digits=20,decimal_places=2)
    discountAmount   = models.DecimalField(default=0,max_digits=20,decimal_places=2)
    cancellationReason     = models.CharField(max_length=250,null=True,blank=True)
    order_cancel_date= models.DateTimeField(null=True,blank=True)
    createdAt        = models.DateTimeField(auto_now_add=True)
    updatedAt        = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.user.first_name
    class Meta:
        db_table = 'order'
        
        
class OrderProducts(models.Model):
    product         = models.ForeignKey(Product,on_delete=models.CASCADE)
    order           = models.ForeignKey(Order,on_delete=models.CASCADE)
    productVariant  = models.ForeignKey(ProductVariant,on_delete=models.CASCADE)
    quantity        = models.IntegerField()
    price           = models.DecimalField(default=0,max_digits=20,decimal_places=2)
    createdAt       = models.DateTimeField(auto_now_add=True)
    updatedAt       = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.product.title
    class Meta:
        db_table = 'order_products'