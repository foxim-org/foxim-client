import { createApp } from 'vue'
import App from './App.vue'
import './styles/zml.scss'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueVirtualScroller from 'vue-virtual-scroller'
import '@/assets/font/font.css'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css  
// 使用vant
import Vant from 'vant'
import 'vant/lib/index.css'
import { createPinia } from 'pinia'
// 使用router
import router from './router'
const app = createApp(App)

app.use(VueVirtualScroller)
app.use(vue3videoPlay)
app.use(router)

const pinia = createPinia()
app.use(pinia)
app.use(Vant)
// 加载
app.mount('#app')
