// Composables
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainPage from '@/components/MainPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
  },
  {
    path: '/mainpage',
    name: 'MainPage',
    component: MainPage,
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
