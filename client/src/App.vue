<script setup lang="ts">
import { NConfigProvider, NModalProvider, NDialogProvider } from 'naive-ui';
import NavBar from './components/NavBar.vue';
import 'vue3-toastify/dist/index.css';
</script>

<template>
  <Suspense>
    <n-config-provider>
      <n-modal-provider>
        <n-dialog-provider>
          <NavBar/>
          <main class="relative">
            <RouterView />
          </main>
        </n-dialog-provider>
      </n-modal-provider>
    </n-config-provider>
  </Suspense>
</template>

<style scoped>
</style>
