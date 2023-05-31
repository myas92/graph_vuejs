import { createApp } from 'vue';
import VNetworkGraph from 'v-network-graph';
import ElementPlus from 'element-plus'
import "v-network-graph/lib/style.css";
import App from './App.vue';

createApp(App)
  .use(VNetworkGraph)
  .use(ElementPlus)
  .mount('#app');
