<template>
  <n-space vertical>
    <n-spin :show="show" :delay="1000">
      <n-alert title="Wait for Login..." type="success">
        Wait for second....
      </n-alert>
    </n-spin>
  </n-space>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { NSpin, NButton, NAlert  } from 'naive-ui'
import Api from '../helpers/api';
import { useRoute, useRouter } from 'vue-router';
const show = ref(true)
const route = useRoute();
const router = useRouter();
onBeforeMount(() => {
  Api.get(`/auth/token/${route.params.token}`)
    .then((response) => {
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken)
        router.push('/')
      } else {
        show.value = false
      }
    })

})
</script>