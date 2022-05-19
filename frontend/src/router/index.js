import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from "@/views/HomeView";

const routes = [
    {
        path: '/',
        name: 'accueil',
        component: HomeView
    },
    {
        path: '/signup',
        name: 'Inscription',
        component: () => import(/* webpackChunkName: "about" */ '../views/SignupView.vue')
    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
