<template>
  <v-card class="color-fondo">
    <v-card-title>
      <h1 class="font-weigth-bold display-6 color-texto">Booking Management</h1>
    </v-card-title>
    <v-tabs>
      <v-tab>Ports</v-tab>
      <v-tab>Booking</v-tab>
      <v-tab>Search Booking</v-tab>
      <v-tab>Vehicle</v-tab>
      <v-tab-item> <Ports /> </v-tab-item>
      <v-tab-item> <Booking /></v-tab-item>
      <v-tab-item> <SearchBooking /></v-tab-item>
      <v-tab-item> <Vehicles /></v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Ports from "./ports/Ports";
import Booking from "./booking/Booking";
import SearchBooking from "./searchbooking/SearchBooking";
import Vehicles from "./vehicles/Vehicles";

export default {
  name: "Principal",
  components: {
    Ports,
    Booking,
    SearchBooking,
    Vehicles,
  },
};
</script>

<style>
.color-fondo {
  background-color: #fffbe6 !important;
}
.color-texto {
  color: #356859 !important;
}
</style>
