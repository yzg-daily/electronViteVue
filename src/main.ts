import {createApp} from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "./router/index";

import './css/index.css'


import './demos/ipc'

// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'
const app = createApp(App);

app.use(ElementPlus)
app.use(router)
app.mount('#app')
    .$nextTick(() => {
        postMessage({payload: 'removeLoading'}, '*')
    })
