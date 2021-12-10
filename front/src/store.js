import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

import api from "./api";


export default new Vuex.Store({
    state: {
        items: [],
        mensaje: {
            mostrar: false,
            texto: "text of the message"
        },
        loading: {
            titulo: "Loading...",
            estado: true
        }
    },

    getters: {
        getAllItems: state => {
            return state.items;
        }
    },

    mutations: {
        async setItems(state) {
            try {
                this.commit("mostrarLoading", "Loading data...")
                let items = await api.getAll();
                if (typeof (items) == "string") {
                    this.commit("mensaje", items)
                } else {
                    state.items = items;
                }
            }
            catch (error) {
                this.commit("mensaje", error.message)
            } finally {
                this.commit("ocultarLoading", "Loading Data...")
            }
        },

        async insetarDoc(state, payload) {
            try {
                this.commit("mostrarLoading", "Loading Data...")
                let r = await api.insert(payload);
                if (typeof (r) == "string") {
                    this.commit("mensaje", r)
                } else {
                    state = r;
                    this.commit("mensaje", "Record added properly");
                    let items = await api.getAll();
                    this.state.items = items;
                }
            }
            catch (error) {
                this.commit("mensaje", error.message)
            } finally {
                this.commit("ocultarLoading", "Loading data...")
            }
        },

        async actualizarDoc(state, payload) {
            let r = await api.update(payload);
            this.commit("mensaje", "Reccord updated properly");
            state = r;
            this.state.items = await api.getAll();
        },

        async borrarDoc(state, payload) {
            state = api.deleteForId(payload.id);
            this.commit("mensaje", "Record delete properly");
            this.state.items = await api.getAll();
        },

        mostrarLoading(state, payload) {
            state.loading.estado = true;
            if (payload !== undefined) {
                this.state.loading.titulo = payload;
            }
        },

        ocultarLoading(state) {
            state.loading.estado = false;
        },

        mensaje(state, payload) {
            this.state.mensaje.mostrar = true;
            this.state.mensaje.texto = payload;
        }
    }
})
