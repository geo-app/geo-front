import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//Boostrap
import 'mdb-vue-ui-kit/css/mdb.min.css';
// import "bootstrap/dist/css/bootstrap.min.css"
// import "bootstrap"


//font
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
//import 'vue-awesome/icons'
library.add(faTrash, faEdit)

import { dom } from "@fortawesome/fontawesome-svg-core";
dom.watch();

//Pinia
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
