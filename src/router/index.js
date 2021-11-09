import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodDetail from '../views/FoodDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import PesananCheckout from '../views/PesananCheckout.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/foods',
    name: 'foods',
    component: Foods
  },
  {
    path: '/food/:id',
    name: 'foodDetail',
    component: FoodDetail
  },
  {
    path: '/keranjang',
    name: 'keranjang',
    component: Keranjang
  },
  {
    path: '/pesanan-checkout',
    name: 'pesanan-checkout',
    component: PesananCheckout
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
