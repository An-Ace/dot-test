<template>
  <div class="my-2 md:my-8 lg:my-14">
    <div class="text-2xl font-semibold mx-8">Data Dari "<a class="text-blue-500" href="https://jsonplaceholder.typicode.com/posts" target="_blank">https://jsonplaceholder.typicode.com/posts</a>"</div>
    <div class="grid md:grid-cols-2 gap-4 md:gap-8 px-8 py-4">
      <div>
        <div class="text-xl font-semibold">From ID</div>
        <n-input-number class="md:w-1/2" v-model:value="from" clearable />
      </div>
      <div>
        <div class="text-xl font-semibold">To ID</div>
        <n-input-number class="md:w-1/2" v-model:value="to" clearable />
      </div>
      <div>
        <NButton v-if="isLogin" type="info" @click="insertsToDB">Insert From Number</NButton>
        <NButton v-else type="info" @click="insertsToDB">Insert Data (Need Login)</NButton>
      </div>
      <div>
        <NButton type="warning" @click="insertAllData">Insert All Data</NButton>
      </div>
    </div>
    <n-data-table
      :row-key="row => row.id"
      class="w-screen px-8"
      :columns="columns"
      :data="data"
      :pagination="{ pageSize: 10 }"
      :bordered="false"
      :scroll-x="1400"
    >
      <template #empty>
        Wait For Data...
      </template>
    </n-data-table>
  </div>
</template>

<script lang="ts" setup>
import { h, onBeforeMount, ref } from 'vue'
import { NButton, NDataTable, NInputNumber } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import Api from '../helpers/api';
import { RouterLink, useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const router = useRouter();
const isLogin = ref(false)
const from = ref(0)
const to = ref(0)

const data = ref<Post[]>([])

const createColumns = (): DataTableColumns<Post> => {
  return [
    {
      title: 'ID',
      key: 'id',
      className: 'w-1/12'
    },
    {
      title: 'User ID',
      key: 'userId',
      className: 'w-1/12'
    },
    {
      title: 'Title',
      key: 'title',
      className: 'w-4/12'
    },
    {
      title: 'Body',
      key: 'body',
      className: 'w-4/12'
    },
    {
      title: 'Aksi',
      render: (row) => h (
        NButton,
        {
          type: isLogin.value ? 'success' : 'info',
          size: 'small',
          onClick: () => {
            isLogin.value ? insertToDB({ userId: row.userId, title: row.title, body: row.body }) : router.push('/signin')
          }
        },
        { default: () => isLogin.value ? 'Insert to DB' : 'Insert to DB (Need Login)' }
      ),
      key: 'action',
      className: 'w-2/12'
    }
  ]
}

const columns = createColumns()
onBeforeMount(() => {
  if (localStorage.getItem('token')) {
    isLogin.value = true
  } else {
    isLogin.value = false
  }
  Api.get('/posts/json').then((res) => {
    data.value = res
  }).catch((err) => {
    console.log(err)
  })
})

const insertToDB = async (data: { userId: number, title: string, body: string }) => {
  Api.post('/posts', {
    userId: data.userId,
    title: data.title,
    body: data.body
  }).then((res) => {
    toast.success('Successfully inserted to database')
  }).catch((err) => {
    console.log(err)
  })
}
const insertsToDB = () => {
  // Create api for post many data from id to id with id in range
  if (from.value > to.value || from.value < 0 || to.value >= data.value.length) {
    throw new Error('Invalid range specified')
  }

  // Slice the array based on the range
  const dataInRange = data.value.slice(from.value - 1, to.value)
    // Send the array of data using Axios
  Api.post('/posts/many', dataInRange).then((res) => {
    toast.success(`Data with ID From ${from.value} To ${to.value} successfully Inserted to database`)
  }).catch((err) => {
    console.log(err)
  })

}
const insertAllData = () => {
  // Send the array of data using Axios
  Api.post('/posts/many', data.value).then((res) => {
    toast.success(`Data with ID From ${data.value[0]} To ${data.value[data.value.length]} successfully Inserted to database`)

  }).catch((err) => {
    console.log(err)
  })
}

</script>
