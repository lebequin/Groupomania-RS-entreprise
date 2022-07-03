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
    },
    {
        path: '/account',
        name: 'Account',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue')
    },
    {
        path: '/edit-account',
        name: 'EditAccount',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/EditAccount.vue')
    },
    {
        path: '/post',
        name: 'PostView',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/PostView.vue')
    },
    {
        path: '/view-post/:memeId',
        name: 'PostDetails',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/PostDetails.vue')
    },
    {
        path: '/edit-post/:memeId',
        name: 'EditPost',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/EditPost.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
