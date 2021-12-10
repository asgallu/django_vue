<template>
  <v-app>
    <v-system-bar>
      <v-app-bar-nav-icon @click.stop="mostrarMenu = !mostrarMenu">
      </v-app-bar-nav-icon>

      <v-spacer></v-spacer>
      <v-icon>perm_identity</v-icon>{{ usuario }}
      <div class="mx-1"></div>
      <v-icon @click="logout">logout</v-icon>
    </v-system-bar>

    <v-navigation-drawer
      v-model="mostrarMenu"
      temporary
      expand-on-hover
      absolute
      :mini-variant="miniVariant"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="../src/assets/logo.png"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title"> Booking </v-list-item-title>
            <v-list-item-subtitle>info@mail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <div v-for="m in menu" :key="m.nombre">
          <router-link :to="m.ruta">
            <v-list-item link>
              <v-list-item-icon
                ><v-icon>{{ m.icono }}</v-icon></v-list-item-icon
              >
              <v-list-item-title>{{ m.nombre }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </div>
      </v-list>
    </v-navigation-drawer>

    <router-view> </router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data() {
    return {
      menu: [
        { ruta: "/", nombre: "Inicio", icono: "home" },
        { ruta: "/booking", nombre: "Booking", icono: "storefront" },
      ],
      mostrarMenu: false,
      miniVariant: true,
      usuario: "",
    };
  },
  mounted() {
    /*testing
    //sessionStorage
    this.$session.set("username", "javier");
    console.log("usuario => ", this.$session.get("username"));
    //locaStorage
    localStorage.usuario = "nuevo usuario";
    console.log(localStorage.usuario);
    */
    this.$root.$on("login", (user) => this.login(user));
    console.log(localStorage.getItem("usuario"));
  },
  methods: {
    logout() {
      localStorage.removeItem("usuario");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      this.usuario = "";
      this.$router.push("/login");
    },
    login(user) {
      this.usuario = user;
    },
  },
};
</script>

<style>
a:link {
  text-decoration: white;
}
</style>
