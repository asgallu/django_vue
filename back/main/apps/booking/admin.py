from django.contrib import admin
from .models import Booking, Vehicle, LoadingPort, DischargePort
from django.utils.html import format_html

from import_export.admin import ExportActionMixin
from .export import VehicleResources
from .export_import import LoadingPortResources, DischargePortResources
from import_export.formats import base_formats

from import_export.admin import ImportExportModelAdmin


class LoadingPortAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = LoadingPortResources
    list_display = ('__str__', 'id',)
    search_fields = ('descriptionL_port',)

    def get_export_formats(self):
        formats = (
            base_formats.CSV,
            base_formats.XLSX,
        )
        return [f for f in formats if f().can_export()]

    def get_import_formats(self):
        formats = (
            base_formats.XLSX,
        )
        return [f for f in formats if f().can_import()]


class DischargePortAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    resource_class = DischargePortResources
    list_display = ('__str__', 'id',)
    search_fields = ('descriptionD_port',)

    def get_export_formats(self):
        formats = (
            base_formats.CSV,
            base_formats.XLSX,
        )
        return [f for f in formats if f().can_export()]

    def get_import_formats(self):
        formats = (
            base_formats.XLSX,
        )
        return [f for f in formats if f().can_import()]


class VehicleAdmin(ExportActionMixin, admin.ModelAdmin):
    list_display = ('id', '__str__', 'vin', 'make', 'model', 'get_weight')
    search_fields = ('vin',)

    resource_class = VehicleResources

    def get_export_formats(self):
        formats = (
            base_formats.CSV,
            base_formats.XLSX,
        )
        return [f for f in formats if f().can_export()]

    def get_weight(self, obj):
        if obj.weight:
            return format_html("<b><i>{} Kg</i></b>", obj.weight)
        return ""
    get_weight.short_description = "weight (kg)"


class VehicleInline(admin.TabularInline):
    model = Vehicle
    extra = 0
    ordering = ('vin',)


class BookingAdmin(admin.ModelAdmin):
    model = Booking
    inlines = [VehicleInline]
    date_hierarchy = 'ship_arrival_date'
    list_display = ('id', '__str__', 'ship_arrival_date',
                    'ship_departure_date', 'discharge_port',)
    raw_id_fields = ('loading_port', 'discharge_port',)
    search_fields = ('booking_number',)
    list_filter = ('loading_port', 'discharge_port')
    ordering = ('-ship_arrival_date',)


admin.site.register(LoadingPort, LoadingPortAdmin)
admin.site.register(DischargePort, DischargePortAdmin)
admin.site.register(Vehicle, VehicleAdmin)
admin.site.register(Booking, BookingAdmin)
