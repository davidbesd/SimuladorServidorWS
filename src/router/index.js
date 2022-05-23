import Vue from "vue";
import VueRouter from "vue-router";
import v_Simulador from "../views/v_Simulador.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "v_Simulador",
        component: v_Simulador,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
