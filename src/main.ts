import App from './App.vue';
import './assets/main.css';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import { createApp } from 'vue';
import router from './router';
import { createPinia } from 'pinia';
import { plugin, defaultConfig } from '@formkit/vue';
import '@formkit/themes/genesis';
import ToastService from 'primevue/toastservice';

const app = createApp(App);

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
    key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string
  }
});

app.mount('#app');
