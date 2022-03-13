import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const NotFound = () => import('@/views/NotFound.vue');
const AboutUs = () => import('@/views/AboutUs.vue');
const BooksOutlet = () => import('@/views/BooksOutlet.vue');
const BookDetail = () => import('@/views/BookDetail.vue');
const BookList = () => import('@/views/BookList.vue');
const BookWatchlist = () => import('@/views/BookWatchlist.vue');
const BookEdit = () => import('@/views/BookEdit.vue');
const BookNew = () => import('@/views/BookNew.vue');
const TheLogin = () => import('@/views/TheLogin.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/books',
  },
  {
    path: '/books',
    component: BooksOutlet,
    children: [
      {
        path: '',
        name: 'Books',
        component: BookList,
      },
      {
        path: 'create',
        name: 'BookNew',
        component: BookNew,
      },
      {
        path: ':isbn',
        name: 'BookDetail',
        component: BookDetail,
      },
      {
        path: ':isbn/edit',
        name: 'BookEdit',
        component: BookEdit,
      },
      {
        path: 'watchlist',
        name: 'BookWatchlist',
        component: BookWatchlist,
      },
    ],
  },
  {
    path: '/about-us',
    name: 'About',
    component: AboutUs,
  },
  {
    path: '/login',
    name: 'Login',
    component: TheLogin,
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
