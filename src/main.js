import { createApp } from 'vue';
import VNetworkGraph from 'v-network-graph';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "v-network-graph/lib/style.css";
import App from './App.vue';

createApp(App)
  .use(ElementPlus)
  .use(VNetworkGraph)
  .mount('#app');
