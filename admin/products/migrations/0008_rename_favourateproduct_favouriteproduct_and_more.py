# Generated by Django 4.2.3 on 2023-07-18 08:58

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('products', '0007_alter_product_countinstock_alter_product_numreviews_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FavourateProduct',
            new_name='FavouriteProduct',
        ),
        migrations.AlterModelTable(
            name='favouriteproduct',
            table='favourite_products',
        ),
    ]
