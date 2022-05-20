import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

// Importación de Bootstrap
import { BootstrapVue } from "bootstrap-vue";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";

Vue.use(BootstrapVue);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
