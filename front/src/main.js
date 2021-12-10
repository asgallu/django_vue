import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify'

import router from "./router"

import store from "./store";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueSessionStorage from "vue-sessionstorage";

Vue.use(Vuetify)
Vue.use(VueSweetalert2);

//session storage
Vue.use(VueSessionStorage)

Vue.config.productionTip = false

Vue.mixin({
  methods: {
    msg(texto, titulo = "", tipo = "success") {
      this.$swal({
        title: titulo,
        text: texto,
        icon: tipo,
        allowOutsideClick: false,
        confirmButtonText: "Ok"
      })
    },
    msgError(txt) {
      this.msg(txt, "mixin global", "error")
    }
  }
})


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
