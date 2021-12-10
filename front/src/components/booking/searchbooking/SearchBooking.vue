<template>
  <v-app>
    <v-form ref="form" v-model="formValido" lazy-validation>
      <v-container>
        <v-row>
          <v-col>
            <v-app-bar color="green" dense>
              <strong><a>Search Booking number by ID</a></strong>
              <v-btn color="red" icon @click="buscar">
                <v-icon>search</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-app-bar>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field
                  v-model="editedEnc.id"
                  append-icon="mdi-magnify"
                  label="No. Booking"
                  disabled=""
                ></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col>
            <v-dialog
              ref="dialog"
              v-model="dialogFecha1"
              :return-value.sync="editedEnc.ship_arrival_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedEnc.ship_arrival_date"
                  label="Ship Arrival Date"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedEnc.ship_arrival_date"
                scrollable
                color="success"
                locale="en"
                :disabled="editedEnc.id != -1"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dialogFecha1 = false"
                  >Cancel</v-btn
                >
                <!--for future develop
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(editedEnc.ship_arrival_date)"
                  >OK</v-btn
                >
                -->
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col>
            <v-dialog
              ref="dialog"
              v-model="dialogFecha2"
              :return-value.sync="editedEnc.ship_departure_date"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="editedEnc.ship_departure_date"
                  label="Ship Departure Date"
                  prepend-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="editedEnc.ship_departure_date"
                scrollable
                color="success"
                locale="es"
                :disabled="editedEnc.id != -1"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="dialogFecha2 = false"
                  >Cancel</v-btn
                >
                <!--for future develop
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(editedEnc.ship_departure_date)"
                  >OK</v-btn
                >
                -->
              </v-date-picker>
            </v-dialog>
          </v-col>

          <v-col cols="5">
            <v-text-field
              v-model="editedEnc.booking_number"
              :items="bookingnumber"
              label="Booking number"
              item-text="booking_number"
              item-value="id"
              return-object
              prepend-icon="mdi-city"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="5">
            <v-text-field
              v-model="editedEnc.loadingport"
              :items="loadingport"
              label="Loading Port"
              item-text="loading_port"
              item-value="id"
              return-object
              prepend-icon="mdi-city"
            ></v-text-field>
          </v-col>
          <v-col cols="5">
            <v-text-field
              v-model="editedEnc.dischargeport"
              :items="dischargeport"
              label="Discharge Port"
              item-text="discharge_port"
              item-value="id"
              return-object
              prepend-icon="mdi-city"
            ></v-text-field>
          </v-col>
        </v-row>

        <h3>All vehicles availables</h3>
        <br />
        <v-row>
          <v-col>
            <v-data-table
              :headers="headers"
              item-key="name"
              class="elevation-1"
              dense
              :loading="loading"
              loading-text="Loading..."
              :items="vehicles"
            >
              <template slot="headers" slot-scope="props">
                <tr>
                  <th
                    v-for="header in props.headers"
                    :key="header.text"
                    :class="[
                      'column sortable',
                      pagination.descending ? 'desc' : 'asc',
                      header.value === pagination.sortBy ? 'active' : '',
                    ]"
                    @click="changeSort(header.value)"
                  >
                    <v-icon small>arrow_upward</v-icon>
                    {{ header.text }}
                  </th>
                </tr>
              </template>
              <template v-slot:no-data>
                <v-alert dense type="info">There are no records</v-alert>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-app>
</template>

<script>
import { ApiBook } from "./ApiSBook";
import { ApiPort } from "../ports/ApiPort";
import { ApiVeh } from "../vehicles/ApiVeh";

export default {
  name: "SearchBooking",
  data() {
    return {
      loading: false,
      formValido: true,
      dialogFecha1: false,
      dialogFecha2: false,
      search: "",
      headers: [
        { text: "ID", value: "id" },
        {
          text: "Booking",
          align: "start",
          sortable: true,
          value: "booking_number",
        },
        {
          text: "Vin",
          align: "start",
          sortable: true,
          value: "vin",
        },
        {
          text: "Make",
          align: "start",
          sortable: true,
          value: "make",
        },
        {
          text: "Model",
          align: "start",
          sortable: true,
          value: "model",
        },
        {
          text: "weight",
          align: "start",
          sortable: true,
          value: "weight",
        },
      ],

      vehicles: [],
      bookingnumber: [],
      dischargeport: [],
      loadingport: [],
      editedEnc: {
        id: -1,
        loadingport: {
          id: -1,
          loadingport: "",
        },
        dischargeport: {
          id: -1,
          dischargeport: "",
        },
        ship_arrival_date: "",
        ship_departure_date: "",
      },
      editedVehicles: {
        id: -1,
        booking: { id: -1, booking_number: "" },
        vin: "",
        make: "",
        model: "",
        weight: "",
      },
      api: new ApiBook(),
      apiPort: new ApiPort(),
      apiVeh: new ApiVeh(),
      encabezado_inicial: {
        id: -1,
        loadingport: {
          id: -1,
          descriptionL_port: "",
        },
        dischargeport: {
          id: -1,
          descriptionD_port: "",
        },
        ship_arrival_date: this.hoy,
        ship_departure_date: this.hoy,
      },
    };
  },
  computed: {
    hoy() {
      return new Date().toISOString().substr(0, 10);
    },
  },
  methods: {
    async iniciar() {
      this.loading = true;
      let r = await this.api.getLoadingPort();
      console.log(r);

      this.loadingport = r;

      this.loadingport = await this.apiPort.getLoadingPort();
      console.log(this.dischargeport);

      this.dischargeport = await this.apiPort.getDischargePort();
      console.log(this.dischargeport);

      //vehicles
      this.vehicles = [];
      let rr = await this.apiVeh.getVehicle();
      this.vehicles = rr;
      console.log(this.vehicles);

      this.editedEnc.ship_arrival_date = this.hoy;
      this.editedEnc.ship_departure_date = this.hoy;
      this.editedEnc.loadingport = "";
      this.editedEnc.dischargeport = "";
      this.loading = false;
    },
    async save() {
      if (!this.$refs.form.validate()) {
        return false;
      }

      const enc = this.editedEnc;

      if (enc.loadingport.id == -1) {
        this.$swal("Loading port required", "", "error");
        return false;
      }

      this.updateData();
    },

    async updateData() {
      this.loading = true;

      const res_booking = await this.api.get(this.editedEnc.id);
      console.log("booking", res_booking);

      //loading_port
      this.editedEnc = res_booking;
      const p = await this.api.getLoadingPort(this.editedEnc.loading_port);
      console.log("loading port", p);
      this.editedEnc["loadingport"] = p["descriptionL_port"];

      this.loading = false;
    },

    async buscar() {
      const { value: idEnc } = await this.$swal.fire({
        title: "Inser booking number",
        input: "text",
        allowOutsideClick: false,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Insert Id booking";
          }
        },
      });

      if (idEnc) {
        this.editedEnc.id = idEnc;
        await this.updateData();

        if (this.editedEnc.id === undefined) {
          this.$swal("Booking not found", idEnc, "error");
          this.editedEnc = {
            id: -1,
            loadingport: {
              id: -1,
              descriptionL_port: "",
            },
            fecha: this.hoy,
          };
        }
      } else {
        this.$swal("Search canceled", "", "warning");
      }
    },

    async prompt(mensaje, titulo) {
      try {
        let result = await this.$swal({
          title: titulo,
          text: mensaje,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          reverseButtons: true,
        });
        return result;
      } catch (e) {
        console.error(e);
      }
    },
  },
  created() {
    this.iniciar();
  },
};
</script>