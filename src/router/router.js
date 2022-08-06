import Main from "@/pages/MainPage";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import PostsPage from "@/pages/PostsPage";
import AboutPage from "@/pages/AboutPage";
import PostPage from "@/pages/PostPage";
import PostsPageWithStore from "@/pages/PostsPageWithStore";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/posts/:id',
        component: PostPage
    },
    {
        path: '/store',
        component: PostsPageWithStore
    },

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;
