<template>
  <section class="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-36 mr-2" src="/dot_logo.png" alt="logo"></a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> Sign in to your account </h1>
          <div class="mt-8">
            <form class="pb-2" action="#" @submit.prevent="loginGoogle">
              <input type="hidden" name="provider" value="google">
              <button class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full text-zinc-950 py-6 dark:text-white" type="submit">
                <span class="mr-2">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enable-background="new 0 0 48 48" class="h-5 w-5" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                      c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                      c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                      C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                      c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                      c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                </span>
                <span class="font-semibold">Google</span>
              </button>
            </form>
          </div>
          <div class="relative my-4">
            <div class="relative flex items-center py-1">
              <div class="grow border-t border-zinc-200 dark:border-zinc-700"></div>
              <div class="grow border-t border-zinc-200 dark:border-zinc-700"></div>
            </div>
          </div>
          <form class="space-y-4 md:space-y-6" action="#" @submit.prevent="register">
            <div>
              <label for="email" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Your Name</label>
              <input type="name" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Test User" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Your Email</label>
              <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="test@demo.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-semibold text-gray-900 dark:text-white">Password</label>
              <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800">
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                </div>
              </div>
              <a href="#" class="text-sm font-semibold text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign Up</button>
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400"> Don’t have an account yet? <RouterLink to="/signin" class="font-semibold text-blue-600 hover:underline dark:text-blue-500">Sign In</RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">

import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import Api from '../helpers/api';

const email = ref('test@demo.com');
const name = ref('Test User');
const password = ref('password');
const router = useRouter();

const register = async () => {
  try {
    const response = await Api.post('/auth/signup', {
      email: email.value,
      name: name.value,
      password: password.value,
    });
    localStorage.setItem('token', response.token);
    router.push('/');
  } catch (error) {
    console.error(error);
  }
};

const loginGoogle = () => {
  window.location.href = '/api/auth/google';
}
</script>