import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AstroView from '@/views/AstroView.vue';
// import SateliteView from '@/views/SateliteView.vue';
import EpicView from '@/views/EpicView.vue';
import RegistrationView from '@/views/RegistrationView.vue';
import LoginView from '@/views/LoginView.vue';
import DashboardView from '@/views/DashboardView.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/astro',
      name: 'astro',
      component: AstroView
    },
    /* {
      path: '/earth',
      name: 'earth',
      component: SateliteView
    }, */
    {
      path: '/epic',
      name: 'epic',
      component: EpicView
    },
    {
      path: '/sign-up',
      name: 'registration',
      component: RegistrationView
    },
    {
      path: '/sign-in',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// NOTE: to avoid issues on page reload,
// we need to wait for firebase auth to initialize before checking for the current user
// ref: https://github.com/firebase/firebase-js-sdk/issues/462

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      auth,
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, _from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert('You must be logged in to see this page');
      next('/');
    }
  } else {
    next();
  }
});

export default router;
