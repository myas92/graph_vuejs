import { createApp } from 'vue';
import VNetworkGraph from 'v-network-graph';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "v-network-graph/lib/style.css";
import App from "./App.vue";
import store from './store'
import router from './router'

createApp(App).use(router)
  .use(store)
  .use(ElementPlus)
  .use(VNetworkGraph)
  .mount('#app');
