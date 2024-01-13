import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/vela-purple/theme.css';
import 'primeicons/primeicons.css';
import VueGoogleMaps from '@fawmi/vue-google-maps';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { API_KEY_GOOGLE } from './config/api';

// UI components
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';

const app = createApp(App);

app.component('PrimeButton', Button);
app.component('MenuBar', Menubar);

app.use(router);
app.use(PrimeVue);
app.use(VueGoogleMaps, {
  load: {
    key: API_KEY_GOOGLE
  }
});
app.mount('#app');
