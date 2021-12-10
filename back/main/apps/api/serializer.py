from rest_framework import serializers
from main.apps.booking.models import LoadingPort, DischargePort, Booking, Vehicle


class LoadingPortSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoadingPort
        fields = '__all__'


class DischargePortSerializer(serializers.ModelSerializer):
    class Meta:
        model = DischargePort
        fields = '__all__'


class VehicleSerializer(serializers.ModelSerializer):
    booking_number = serializers.ReadOnlyField(
        source='pk_booking.booking_number')

    class Meta:
        model = Vehicle
        fields = ("id", "pk_booking", "vin", "make",
                  "model", "weight", "booking_number")
        #fields = ("id", "vin", "make", "model", "weight", "booking_number")


class BookingSerializer(serializers.ModelSerializer):
    vin = serializers.ReadOnlyField(source='vehicle.vin')
    loadingport = serializers.ReadOnlyField(
        source='loading_port.descriptionL_port')
    dischargeport = serializers.ReadOnlyField(
        source='discharge_port.descriptionD_port')

    class Meta:
        model = Booking
        fields = ("id", "booking_number", "loading_port", "discharge_port",
                  "ship_arrival_date", "ship_departure_date", "vin", "loadingport", "dischargeport")
