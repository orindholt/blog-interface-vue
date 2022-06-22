<script setup>
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue"
</script>

<template>
	<header>
		<Navbar />
	</header>

	<main class="pt-10 px-10 min-h-screen flex flex-col">
		<RouterView />
	</main>
</template>

<style>
@import "@/assets/base.css";
</style>
