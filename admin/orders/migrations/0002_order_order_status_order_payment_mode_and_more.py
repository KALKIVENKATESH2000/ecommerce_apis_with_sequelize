# Generated by Django 4.2.3 on 2023-07-21 07:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Cancelled', 'Cancelled'), ('Accepted', 'Accepted'), ('Processing', 'Processing'), ('Delivered', 'Delivered')], default='Pending', max_length=15),
        ),
        migrations.AddField(
            model_name='order',
            name='payment_mode',
            field=models.CharField(choices=[('cod', 'COD'), ('online', 'ONLINE')], default='Processing', max_length=15),
        ),
        migrations.AddField(
            model_name='order',
            name='payment_status',
            field=models.CharField(choices=[('Pending', 'Pending'), ('Success', 'Success'), ('Failed', 'Failed')], default='Processing', max_length=15),
        ),
    ]
