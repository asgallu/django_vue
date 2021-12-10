from django.db import models


class LoadingPort(models.Model):
    id = models.BigAutoField(primary_key=True)
    code_port = models.CharField(
        max_length=4,
        unique=True,
        null=False,
        blank=False,
        verbose_name="Code loading port"
    )

    descriptionL_port = models.CharField(
        max_length=55,
        null=False,
        blank=False,
        verbose_name="Description loading Port"
    )

    def __str__(self):
        return '{} - {}'.format(self.code_port, self.descriptionL_port)

    def save(self, *args, **kwargs):
        super(LoadingPort, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Loading Port"


class DischargePort(models.Model):
    id = models.BigAutoField(primary_key=True)
    code_port = models.CharField(
        max_length=4,
        unique=True,
        null=False,
        blank=False,
        verbose_name="Code discharge port"
    )

    descriptionD_port = models.CharField(
        max_length=55,
        null=False,
        blank=False,
        verbose_name="Description discharge port"
    )

    def __str__(self):
        return '{} - {}'.format(self.code_port, self.descriptionD_port)

    def save(self, *args, **kwargs):
        super(DischargePort, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Discharge Port"


class Booking(models.Model):
    booking_number = models.CharField(
        max_length=10,
        unique=True,
        #help_text=("Booking number"),
        verbose_name="Booking number"
    )

    loading_port = models.ForeignKey(
        LoadingPort,
        blank=False,
        verbose_name="Loading Port",
        on_delete=models.CASCADE
    )

    discharge_port = models.ForeignKey(
        DischargePort,
        blank=False,
        verbose_name="Discharge Port",
        on_delete=models.CASCADE
    )

    ship_arrival_date = models.DateField(
        blank=False,
        null=False,
        verbose_name="Ship arrival date"
    )

    ship_departure_date = models.DateField(
        blank=False,
        null=False,
        verbose_name="Ship departure date"
    )

    def __str__(self):
        return '{} - {}'.format(self.booking_number, self.loading_port)

    def save(self, *args, **kwargs):
        self.booking_number = self.booking_number.upper()
        super(Booking, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Booking"


class Vehicle(models.Model):
    pk_booking = models.ForeignKey(
        Booking,
        blank=False,
        verbose_name="Booking",
        on_delete=models.CASCADE
    )

    vin = models.CharField(
        max_length=17,
        unique=True,
        blank=False,
        verbose_name="Vehicle Identification Number"
    )

    make = models.CharField(
        max_length=55,
        blank=True,
        verbose_name="Make"
    )

    model = models.CharField(
        max_length=55,
        blank=True,
        verbose_name="Model"
    )

    weight = models.FloatField(
        blank=True,
        null=True,
        verbose_name="weight"
    )

    def __str__(self):
        return '{} - VIN => {}'.format(self.pk_booking, self.vin)

    def save(self, *args, **kwargs):
        self.vin = self.vin.upper()
        super(Vehicle, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Vehicle"
