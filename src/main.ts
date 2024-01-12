import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/vela-purple/theme.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// UI components
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.component('PrimeButton', Button)
app.component('MenuBar', Menubar)

app.mount('#app')
