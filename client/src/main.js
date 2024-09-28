import { createApp } from 'vue'
import './css/style.css'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Home from './pages/Home.vue'
import Post from './pages/Post.vue'
import SignIn from './pages/SignIn.vue'
import SignUp from './pages/SignUp.vue'
import GetToken from './pages/GetToken.vue'
import SignOut from './pages/SignOut.vue'
import Vue3Toastify from 'vue3-toastify'
const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: Post },
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
  { path: '/signout', component: SignOut },
  { path: '/token/:token', component: GetToken },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).use(Vue3Toastify)
.mount('#app')
