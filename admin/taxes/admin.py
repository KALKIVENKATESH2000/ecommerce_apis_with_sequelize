from django.contrib import admin
from .models import Country, State, City
# Register your models here.

class CountryAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in Country._meta.fields ]
admin.site.register(Country, CountryAdmin)


class StateAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in State._meta.fields ]
admin.site.register(State, StateAdmin)


class CityAdmin(admin.ModelAdmin):
    list_display =  [field.name for field in City._meta.fields ]
admin.site.register(City, CityAdmin)