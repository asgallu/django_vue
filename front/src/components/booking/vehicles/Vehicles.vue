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
                <v-toolbar-title>Vehicles</v-toolbar-title>
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
                            <v-autocomplete
                              v-model="editedItem.pk_booking"
                              :items="bookings"
                              label="Booking"
                              item-text="booking_number"
                              item-value="id"
                              return-object
                            >
                            </v-autocomplete>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="editedItem.vin"
                              label="Vin"
                              :rules="vinRules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="editedItem.make"
                              label="Make"
                              :rules="makeRules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="5">
                            <v-text-field
                              v-model="editedItem.model"
                              label="Model"
                              :rules="modelRules"
                            ></v-text-field>
                            <v-col cols="5">
                              <v-text-field
                                v-model="editedItem.weight"
                                label="Weight"
                              ></v-text-field>
                            </v-col>
                          </v-col>
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
import { ApiVeh } from "./ApiVeh";

export default {
  name: "Vehicles",
  data() {
    return {
      items: [],
      vinRules: [
        (v) => !!v || "Required",
        (v) => v.length <= 17 || "Max. 17 chars",
      ],
      makeRules: [
        (v) => !!v || "Required",
        (v) => v.length <= 55 || "Max. 55 chars",
      ],
      modelRules: [
        (v) => !!v || "Required",
        (v) => v.length <= 55 || "Max. 55 chars",
      ],
      api: new ApiVeh(),
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
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      editedIdex: -1,
      editedItem: {
        id: -1,
        pk_booking: { id: -1, booking_number: "" },
        vin: "",
        make: "",
        model: "",
        weight: "",
      },
      defaultItem: {
        id: -1,
        pk_booking: { id: -1, booking_number: "" },
        vin: "",
        make: "",
        model: "",
        weight: "",
      },
      bookings: [],
    };
  },

  computed: {
    formTitle() {
      return (this.editedIdex === -1 ? "New" : "Edit") + " Vehicle";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    async iniciar() {
      try {
        this.loading = true;
        //vehicles
        let r = await this.api.getVehicle();
        this.items = r;
        //booking
        this.bookings = await this.api.getBooking();
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
      //const cat = cp["booking_number"];
      const cat = cp["pk_booking"];
      let idCat = null;

      if (cat["id"] !== undefined) {
        idCat = cat["id"];
      } else {
        idCat = cat;
      }

      const obj = {
        id: cp["id"],
        pk_booking: idCat,
        vin: cp["vin"],
        make: cp["make"],
        model: cp["model"],
        weight: cp["weight"],
      };
      //console.log(obj);
      try {
        this.loading = true;
        await this.api.saveVehicle(obj);
        this.close();
        this.iniciar();
      } catch (error) {
        alert(error);
      } finally {
        this.loading = false;
      }
    },

    async deleteItem(item) {
      if (confirm("Delete Vehicle?")) {
        await this.api.delVehicle(item.id);
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