/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded
} from 'vue-router/auto'
import {setupLayouts} from 'virtual:generated-layouts'
import {routes} from 'vue-router/auto-routes'
import {useUserStore} from '@/stores/user'
import {createWebHashHistory} from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts([
    ...routes,
  ]),
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next: NavigationGuardNext) => {
  const store = useUserStore();

  const isRequiredAuth = to.meta.requiresAuth || false
  const isRequiredAdmin = to.meta.isAdmin || false

  if (isRequiredAuth) {
    if (
      !store.isLoggedIn &&
      to.name !== '/auth/') {
      console.log('User is not logged in, redirecting to auth page')
      next({name: '/auth/'})
    } else {
      if (isRequiredAdmin && !store.isAdmin) {
        next({name: '/'})
        return
      } else
        next()
    }
  } else
    next()
});

export default router
