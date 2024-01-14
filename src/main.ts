import App from './App.vue';
import './assets/main.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import { createApp } from 'vue';
import router from './router';
import { API_KEY_GOOGLE } from './config';
import { createPinia } from 'pinia';
import { plugin, defaultConfig } from '@formkit/vue';
import '@formkit/themes/genesis';
import ToastService from 'primevue/toastservice';

// UI components
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import Toast from 'primevue/toast';

const app = createApp(App);

app.component('PrimeButton', Button);
app.component('MenuBar', Menubar);
app.component('ToastVue', Toast);

app.use(createPinia());
app.use(router);
app.use(
  plugin,
  defaultConfig({
    theme: 'genesis'
  })
);
app.use(PrimeVue);
app.use(ToastService);
app.use(VueGoogleMaps, {
  load: {
    key: API_KEY_GOOGLE
  }
});

app.mount('#app');
