<template>
  <nav class="relative flex flex-wrap items-center justify-between px-2 py-3 bg-emerald-500 mb-3">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto  px-4 lg:static lg:block lg:justify-start">
        <a class="flex text-sm font-bold leading-relaxed align-middle mr-4 py-2 whitespace-nowrap uppercase text-white" href="https://www.dot.co.id/" target="_blank">
          <span>DOT INDONESIA</span>
        </a>
        <button class="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none" type="button" v-on:click="toggleNavbar()">
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1em" viewBox="0 0 1536 1280">
            <path fill="currentColor" d="M1536 1088v128q0 26-19 45t-45 19H64q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45m0-512v128q0 26-19 45t-45 19H64q-26 0-45-19T0 704V576q0-26 19-45t45-19h1408q26 0 45 19t19 45m0-512v128q0 26-19 45t-45 19H64q-26 0-45-19T0 192V64q0-26 19-45T64 0h1408q26 0 45 19t19 45" />
          </svg>
        </button>
      </div>
      <div v-bind:class="{'hidden': !showMenu, 'flex': showMenu}" class="lg:flex lg:flex-grow items-center">
        <ul class="flex flex-col lg:flex-row list-none ml-auto">
          <li class="nav-item">
            <RouterLink activeClass="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 hover:opacity-75" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/">
              <i class="fab fa-facebook-square text-lg leading-lg text-white opacity-75" /><span class="ml-2">JSON API</span>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="isLogin">
            <RouterLink activeClass="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 hover:opacity-75" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/posts">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75" /><span class="ml-2">POSTS (CRUD)</span>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <RouterLink activeClass="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 hover:opacity-75" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/signin">
              <i class="fab fa-twitter text-lg leading-lg text-white opacity-75" /><span class="ml-2">POSTS (Need Login)</span>
            </RouterLink>
          </li>
          <li class="nav-item" v-if="!isLogin">
            <RouterLink activeClass="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 hover:opacity-75" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" to="/signin">
              <NButton size="tiny" type="primary"><span class="ml-2 font-semibold">SIGN IN</span></NButton>
            </RouterLink>
          </li>
          <li class="nav-item" v-else>
            <a activeClass="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-slate-500 hover:opacity-75" class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" href="/signout">
              <NButton size="tiny" type="primary"><span class="ml-2 font-semibold">LOGOUT</span></NButton>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

import { NButton } from 'naive-ui';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isLogin = ref(false);
const router = useRouter();
const showMenu = ref(false);
const toggleNavbar = () => {
  showMenu.value = !showMenu.value;
};
router.afterEach(() => {
  if (localStorage.getItem('token')) {
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
})
</script>
