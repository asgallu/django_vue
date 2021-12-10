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
                <v-toolbar-title>Discharge Port</v-toolbar-title>
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

                <!-- MODAL -->
                <v-dialog v-model="dialog" max-width="500px">
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

                    <!-- edit & delete -->
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="2" sm="2" md="2">
                            <v-text-field
                              v-model="editedItem.id"
                              label="ID"
                              disabled
                            ></v-text-field>
                          </v-col>
                          <v-col cols="10" sm="10" md="10">
                            <v-text-field
                              v-model="editedItem.code_port"
                              label="Code"
                              :rules="code_portRules"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="10" sm="10" md="10">
                            <v-text-field
                              v-model="editedItem.descriptionD_port"
                              label="Description"
                              :rules="descriptionRules"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

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
                  <!-- END MODAL -->
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
import { ApiPort } from "./ApiPort";
import mensajesMixin from "../../../mixins/mensajesMixin";

export default {
  name: "LoadingPort",
  mixins: [mensajesMixin],
  data() {
    return {
      items: [],
      code_portRules: [
        (v) => !!v || "Required",
        (v) => v.length <= 4 || "Max. 4 chars",
      ],
      descriptionRules: [
        (v) => !!v || "Required",
        (v) => v.length <= 55 || "Max. 55 chars",
      ],
      api: new ApiPort(),
      loading: false,
      search: "",
      headers: [
        //column 1
        { text: "ID", value: "id" },
        //column 2
        {
          text: "Code",
          align: "start",
          sortable: true,
          value: "code_port",
        },
        //column 3
        {
          text: "Description",
          align: "start",
          sortable: true,
          value: "descriptionD_port",
        },
        //column 4
        { text: "Actions", value: "actions", sortable: false },
      ],
      dialog: false,
      editedIdex: -1,
      //value of field to modify
      editedItem: {
        id: -1,
        code_port: "",
        descriptionD_port: "",
      },
      //default values
      defaultItem: {
        id: -1,
        code_port: "",
        descriptionD_port: "",
      },
    };
  },

  computed: {
    formTitle() {
      return (this.editedIdex === -1 ? "New" : "Edit") + " Loading Port";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    //loading data
    async iniciar() {
      try {
        this.loading = true;
        let r = await this.api.getDischargePort();
        this.items = r;
      } catch (error) {
        //alert(error);
        this.mensaje("We can't connect to back", "Error");
        this.msgError(error);
      } finally {
        this.loading = false;
      }
    },

    close() {
      this.dialog = false;
      //when we close modal => set values by default
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
      //data to const obj
      const obj = this.editedItem;
      try {
        this.loading = true;
        await this.api.saveDischargePort(obj);
        //this.mensaje("Save properly");
        this.close();
        this.iniciar();
      } catch (error) {
        //alert(error);
        this.mensaje("Sorry, it's not saved, revise field constrains");
      } finally {
        this.loading = false;
      }
    },
    async deleteItem(item) {
      if (
        await this.mensajeSiNo(
          `¿Delete Loading Port: ${item.descriptionD_port}`
        )
      ) {
        await this.api.delDischargePort(item.id);
        this.iniciar();
        this.mensaje("Deleted properly", "Discharge port");
      }
    },
  },
  //when created we start
  created() {
    this.iniciar();
  },
};
</script>

<style scoped>
</style>