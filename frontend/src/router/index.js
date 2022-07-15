import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from "@/views/HomeView";
import SignupView from "@/views/SignupView";
import Login from "@/views/Login";

const isAuthenticated = (to, from, next) => {
    if (localStorage.getItem('token')) {
        next();
    } else {
        window.location.replace("#/login")
    }
};

const routes = [
    {
        path: '/',
        name: 'accueil',
        component: HomeView
    },
    {
        path: '/signup',
        name: 'Inscription',
        component: SignupView
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/account',
        name: 'Account',
        component: () => import('../views/AccountView.vue'),
        beforeEnter: isAuthenticated,
    },
    {
        path: '/edit-account',
        name: 'EditAccount',
        component: () => import('../views/EditAccount.vue'),
        beforeEnter: isAuthenticated,
    },
    {
        path: '/edit-account/:id',
        name: 'EditAccount',
        component: () => import('../views/EditAccount.vue'),
        beforeEnter: isAuthenticated,
    },
    {
        path: '/post',
        name: 'PostView',
        component: () => import('../views/PostView.vue'),
        beforeEnter: isAuthenticated,
    },
    {
        path: '/view-post/:memeId',
        name: 'PostDetails',
        component: () => import('../views/PostDetails.vue'),
        beforeEnter: isAuthenticated,
    },
    {
        path: '/edit-post/:memeId',
        name: 'EditPost',
        component: () => import('../views/EditPost.vue'),
        beforeEnter: isAuthenticated,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router
