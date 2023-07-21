from django.db import models

# Create your models here.

class Country(models.Model):

    name            = models.CharField(max_length=200,unique=True)
    code            = models.CharField(max_length=200,unique=True)
    published       = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'country'

class State(models.Model):

    name            = models.CharField(max_length=200,unique=True)
    country         = models.ForeignKey(Country,on_delete=models.CASCADE)
    tax_rate        = models.FloatField(default=0.00,help_text="Enter in % only")
    published       = models.BooleanField(default=True)
    def __str__(self):
        return self.name
    class Meta:
        db_table = 'state'
        
class City(models.Model):

    name            = models.CharField(max_length=200,unique=True)
    state          = models.ForeignKey(State,on_delete=models.CASCADE)
    country         = models.ForeignKey(Country,on_delete=models.CASCADE)
    published       = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    class Meta:
        db_table = 'city'