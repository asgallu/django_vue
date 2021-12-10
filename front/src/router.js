import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "./components/Home"

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/booking",
        name: "booking",
        component: () => import('./components/booking/Principal')
    },
    {
        path: "/login",
        name: "login",
        component: () => import('./components/login/Login')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router