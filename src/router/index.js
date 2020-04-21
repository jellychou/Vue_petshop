import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Coupons from '../views/Coupons.vue'
import Products from '../views/Products.vue'
import Dashboard from '../views/Dashboard.vue'
import ProductList from '../views/ProductList.vue'
import OrderList from '../views/Order_list.vue'
import CouponList from '../views/CouponList.vue'
import Cart from '../views/Cart.vue'
import Index from '../components/Index.vue'
import CustomerList from '../views/CustomerList.vue'
import CustomerCheckout from '../views/CustomerCheckout.vue'
import CheckoutSuccess from '../views/CheckoutSuccess.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'index',
        component: Index
      },
      {
        path: '/products',
        name: 'products',
        component: Products
      },
      {
        path: '/coupons',
        name: 'coupons',
        component: Coupons
      },
      {
        path: '/cart',
        name: 'cart',
        component: Cart
      },
      {
        path: '/customer_list',
        name: 'customer_list',
        component: CustomerList
      },
      {
        path: '/customer_checkout',
        name: 'customer_checkout',
        component: CustomerCheckout
      },
      {
        path: '/checkout_success',
        name: 'checkout_success',
        component: CheckoutSuccess
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/admin',
    name: 'dashboard',
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: '/product_list',
        name: 'product_list',
        component: ProductList,
        meta: { requiresAuth: true }
      },
      {
        path: '/order_list',
        name: 'order_list',
        component: OrderList,
        meta: { requiresAuth: true }
      },
      {
        path: '/coupon_list',
        name: 'coupon_list',
        component: CouponList,
        meta: { requiresAuth: true }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
