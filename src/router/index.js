import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Dashboard",
			component: HomeView,
		},
		{
			path: "/blog",
			name: "Blog",
			component: () => import("../views/Blog/Blog.vue"),
		},
		{
			path: "/blog/:id",
			component: () => import("../views/Blog/Slug.vue"),
		},
		{
			path: "/login",
			name: "Login",
			component: () => import("../views/Login.vue"),
		},
		{
			path: "/signup",
			name: "Sign Up",
			component: () => import("../views/SignUp.vue"),
		},
		{
			path: "/bookmarks",
			name: "Bookmarks",
			component: () => import("../views/Bookmarks.vue"),
		},
		{
			path: "/profile",
			name: "Profile",
			component: () => import("../views/Profile.vue"),
		},
	],
});

export default router;
