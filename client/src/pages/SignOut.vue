<template>
  <n-space vertical>
    <n-spin :show="show" :delay="1000">
      <n-alert title="Wait for Logout..." type="warning">
        Wait for second....
      </n-alert>
    </n-spin>
  </n-space>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { NSpin, NAlert  } from 'naive-ui'
import { useRouter } from 'vue-router';
const show = ref(true)
const router = useRouter();
onBeforeMount(() => {
  localStorage.removeItem('token')
  router.push('/')
})
</script>