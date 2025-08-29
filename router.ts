import { createRouter, createWebHistory } from 'vue-router';
import Cookies from 'js-cookie';

import Login from './src/pages/auth/Login.vue';
import Dashboard from './src/pages/Index.vue';
import ProductsList from './src/pages/products/List.vue';
import ProductCreate from './src/pages/products/Create.vue';
import ProductDetail from './src/pages/products/Detail.vue';
import CartList from './src/pages/cart/List.vue';

const routes = [
  { name: 'Dashboard', path: '/', component: Dashboard },
  { name: 'Login', path: '/login', component: Login },
  { name: 'Products', path: '/products', component: ProductsList },
  {
    name: 'CreateProduct',
    path: '/products/create',
    component: ProductCreate,
  },
  { name: 'DetailProduct', path: '/products/:id', component: ProductDetail },
  { name: 'Cart', path: '/cart', component: CartList },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard middleware
router.beforeEach((to, from, next) => {
  const token = Cookies.get('token');
  if (!token && to.name !== 'Login') {
    next({ name: 'Login' });
  } else if (token && to.name === 'Login') {
    next({ name: 'Dashboard' });
  } else {
    next();
  }
});
