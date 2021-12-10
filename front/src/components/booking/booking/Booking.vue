<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-data-table
            dense
            :headers="headers"
            :items="items"
            :search="search"
            class="elevation-1"
            :loading="loading"
            loading-text="Loading..."
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Booking</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Buscar"
                ></v-text-field>
                <v-spacer></v-spacer>

                <v-btn color="warning" dark class="mb-2" @click="iniciar">
                  <v-icon>cached</v-icon>
                </v-btn>

                <v-btn color="green" dark class="mb-2" @click="exportExcel">
                  xlsx
                </v-btn>

                <v-dialog v-model="dialog" max-width="100%">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon>add_box</v-icon>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>
                    <!--- MODAL -->
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2">
                            <v-text-field
                              v-model="editedItem.id"
                              label="ID"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="editedItem.booking_number"
                              label="Booking number"
                              :rules="booking_numberRules"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="5">
                            <v-autocomplete
                              v-model="editedItem.loading_port"
                              :items="loadingports"
                              label="Loading Port"
                              item-text="descriptionL_port"
                              item-value="id"
                              return-object
                            >
                            </v-autocomplete>
                          </v-col>

                          <v-col cols="5">
                            <v-autocomplete
                              v-model="editedItem.discharge_port"
                              :items="dischargeports"
                              label="Discharge Port"
                              item-text="descriptionD_port"
                              item-value="id"
                              return-object
                            >
                            </v-autocomplete>
                          </v-col>

                          <!--
                            <v-text-field
                              v-model="editedItem.ship_arrival_date"
                              label="Ship arrival date"
                            ></v-text-field>
                            -->

                          <v-col cols="5">
                            <v-dialog
                              ref="dialog1"
                              v-model="dialogFecha1"
                              :return-value.sync="editedItem.ship_arrival_date"
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.ship_arrival_date"
                                  label="Ship Arrival Date"
                                  prepend-icon="event"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="editedItem.ship_arrival_date"
                                scrollable
                                color="success"
                                locale="en"
                                required
                                :enabled="editedItem.id != -1"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="dialogFecha1 = false"
                                  >Cancel</v-btn
                                >

                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.dialog1.save(
                                      editedItem.ship_arrival_date
                                    )
                                  "
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-col>

                          <!---->
                          <v-col cols="5">
                            <v-dialog
                              ref="dialog2"
                              v-model="dialogFecha2"
                              :return-value.sync="
                                editedItem.ship_departure_date
                              "
                              persistent
                              width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                  v-model="editedItem.ship_departure_date"
                                  label="Ship Departure Date"
                                  prepend-icon="event"
                                  v-bind="attrs"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="editedItem.ship_departure_date"
                                scrollable
                                color="success"
                                locale="en"
                                required
                                :enabled="editedItem.id != -1"
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="dialogFecha2 = false"
                                  >Cancel</v-btn
                                >

                                <v-btn
                                  text
                                  color="primary"
                                  @click="
                                    $refs.dialog2.save(
                                      editedItem.ship_departure_date
                                    )
                                  "
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
                          </v-col>
                          <!---->
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <!--- END MODAL -->
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="pink accent-3" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)"
                >mdi-pencil</v-icon
              >
              <v-icon color="danger" small @click="deleteItem(item)"
                >mdi-delete</v-icon
              >
            </template>

            <template v-slot:no-data>
              <v-btn color="primary" @click="iniciar">Reiniciar</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { ApiBook } from "./ApiBook";
import XLSX from "xlsx";
//import moment from "moment";

export default {
  name: "Booking",
  data() {
    return {
      //items
      items: [],
      dialogFecha1: false,
      dialogFecha2: false,
      booking_numberRules: [
        (v) => !!v || "Required",
        (v) => v.length <= 10 || "Max. 10 chars",
      ],
      api: new ApiBook(),
      loading: false,
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
          text: "Loading Port",
          align: "start",
          sortable: true,
          value: "loadingport",
        },
        {
          text: "Discharge Port",
          align: "start",
          sortable: true,
          value: "dischargeport",
        },
        {
          text: "Ship arrival date",
          align: "start",
          sortable: true,
          value: "ship_arrival_date",
        },
        {
          text: "Ship departure date",
          align: "start",
          sortable: true,
          value: "ship_departure_date",
        },
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      editedIdex: -1,
      editedItem: {
        id: -1,
        booking_number: "",
        loading_port: { id: -1, descriptionL_port: "" },
        discharge_port: { id: -1, descriptionD_port: "" },
        ship_arrival_date: "",
        ship_departure_date: "",
      },
      defaultItem: {
        id: -1,
        booking_number: "",
        loading_port: { id: -1, descriptionL_port: "" },
        discharge_port: { id: -1, descriptionD_port: "" },
        ship_arrival_date: "",
        ship_departure_date: "",
      },
      loadingports: [],
      dischargeports: [],
    };
  },

  computed: {
    formTitle() {
      return (this.editedIdex === -1 ? "New" : "Edit") + " Booking";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    exportExcel() {
      const dataXlsx = XLSX.utils.json_to_sheet(this.items);
      const workbook = XLSX.utils.book_new();
      const filename = "bookings";
      XLSX.utils.book_append_sheet(workbook, dataXlsx, filename);
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },

    async iniciar() {
      try {
        this.loading = true;
        //booking
        let r = await this.api.getBooking();
        this.items = r;
        //loadingport
        this.loadingports = await this.api.getLoadingPort();
        //dischargeport
        this.dischargeports = await this.api.getDischargePort();
      } catch (error) {
        alert(error);
      } finally {
        this.loading = false;
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    editItem(item) {
      this.editedIdex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async save() {
      const cp = this.editedItem;
      //console.log("editedItem: ", cp);

      const cat = cp["loading_port"];
      //console.log("cat =>", cat);
      const cat2 = cp["discharge_port"];
      let idCat = null;
      let idCat2 = null;

      if (cat["id"] !== undefined) {
        idCat = cat["id"];
      } else {
        idCat = cat;
      }

      if (cat2["id"] !== undefined) {
        idCat2 = cat2["id"];
      } else {
        idCat2 = cat2;
      }

      //console.log(cat);
      //console.log(idCat);

      const obj = {
        id: cp["id"],
        booking_number: cp["booking_number"],
        loading_port: idCat,
        discharge_port: idCat2,
        ship_arrival_date: cp["ship_arrival_date"],
        ship_departure_date: cp["ship_departure_date"],
      };
      //console.log("save =>", obj);
      try {
        this.loading = true;
        await this.api.saveBooking(obj);
        this.close();
        this.iniciar();
      } catch (error) {
        alert(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteItem(item) {
      if (confirm("Delete Booking?")) {
        await this.api.delBooking(item.id);
        this.iniciar();
      }
    },
  },

  created() {
    this.iniciar();
  },
};
</script>

<style scoped>
</style>