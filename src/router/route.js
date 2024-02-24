import { createRouter, createWebHistory } from 'vue-router'

// Import Webpages

import Home from '../views/Home.vue'
import NotFound from '../views/404.vue'
import mainSearch from '../views/MainSearch.vue'

// Setting up addresses with their associated webpages
const routes = [
    { 
        path: '/',
        component: Home,
        meta: {
            title: 'CVExpl',
        }
    },

    { 
        path: '/search',
        component: mainSearch,
        meta: {
            title: 'CVExpl | Search',
        }
    },

    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        meta: {
            title: '404 Not Found',
        },
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "active",
})

router.beforeEach((to, from, next) => {
    document.title = to.meta?.title ?? 'CVExpl'
    next()
  })
  
export default router;