<template>
  <div class="my-2 md:my-8 lg:my-14">
    <div class="text-2xl font-semibold mx-8 my-2 flex justify-between">
      <span>Data Dari Database</span>
      <div>
        <NButton
          v-if="checkedRowKeys.length > 0"
          type="error"
          size="small"
          class="mx-1"
          @click="
            dialog.create({
              type: 'error',
              title: `Hapus Post Terpilih: ${checkedRowKeys}`,
              content: 'Apa anda yakin?',
              negativeText: 'Tidak',
              positiveText: 'Ya, Hapus',
              onPositiveClick: () => {
                Api.delete(`/posts/${JSON.stringify(checkedRowKeys)}/many`).then(() => {
                  data = data.filter((post) => !checkedRowKeys.includes(post.id))
                  toast.success('Post berhasil dihapus')
                }).catch((err) => {
                  console.log(err)
                })
              }
            })
          "
        >
          Hapus Terpilih
        </NButton>
        <NButton
          v-if="checkedRowKeys.length > 0"
          type="info"
          size="small"
          class="mx-1"
          @click="
            modal.create({
              title: 'Edit Post Terpilih',
              preset: 'dialog',
              content: () => h(EditManyPostForm, {
                ids: checkedRowKeys,
                onUpdated: (posts) => {
                  posts.forEach((post) => {
                    const index = data.findIndex((p) => p.id === post.id)
                    data[index] = { ...data[index], ...post }
                  })
                }
              })
            })"
        >
          Edit Terpilih
        </NButton>
        <NButton
          type="primary"
          size="small"
          class="mx-1"
          @click="
            modal.create({
              title: 'Tambahkan Post',
              preset: 'dialog',
              content: () => h(AddPostForm, { onAdded: (post) => data = [post, ...data] })
            })"
        >
          Tambah Post
        </NButton>
      </div>
    </div>
    <n-data-table
      :row-key="row => row.id"
      class="w-screen px-8"
      v-model:checked-row-keys="checkedRowKeys"
      :columns="columns"
      :data="data"
      :pagination="paginationReactive"
      :bordered="false"
      :scroll-x="1400"
    />
  </div>
</template>

<script lang="ts" setup>
import { h, onBeforeMount, onUpdated, reactive, ref } from 'vue'
import { NButton, NDataTable, useDialog, useModal } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import Api from '../helpers/api';
import EditPostForm from '../components/EditPostForm.vue';
import { toast } from 'vue3-toastify';
import AddPostForm from '../components/AddPostForm.vue';
import EditManyPostForm from '../components/EditManyPostForm.vue';

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

const modal = useModal()
const dialog = useDialog()
const data = ref<Post[]>([])
const checkedRowKeys = ref<number[]>([])

const createColumns = (): DataTableColumns<Post> => {
  return [
    {
      type: 'selection',
      options: [
        'all',
        'none',
        {
          label: 'Select Rows',
          key: 'f2',
          onSelect: (pageData) => {
            checkedRowKeys.value = pageData
              .map(row => row.id)
              .slice(0, 2)
            console.log(checkedRowKeys.value)
          }
        }
      ]
    },
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
      render: (row) => [
        h(
          NButton,
          {
            type: 'info',
            size: 'small',
            class: 'mx-1',
            onClick: () => {
              modal.create({
                title: `Edit Post ${row.id}`,
                type: 'info',
                preset: 'dialog',
                content: () => h(EditPostForm, {
                  id: row.id,
                  userId: row.userId, title: row.title, body: row.body, 
                  onUpdated: (post) => {
                    const getIndex = data.value.findIndex((post) => post.id === row.id)
                    data.value[getIndex] = post
                    toast.success('Post berhasil diupdate')}
                })
              })
            }
          },
          { default: () => 'Edit' }
        ),
        h(
          NButton,
          {
            type: 'error',
            size: 'small',
            class: 'mx-1',
            onClick: () => {
              dialog.create({
                type: 'error',
                title: `Hapus Post ${row.id}`,
                content: "Apa anda yakin?",
                negativeText: 'Tidak',
                positiveText: 'Ya, Hapus',
                onPositiveClick: () => {
                  Api.delete(`/posts/${row.id}`).then(() => {
                    data.value = data.value.filter((post) => post.id !== row.id)
                    toast.success('Post berhasil dihapus')
                  }).catch((err) => {
                    console.log(err)
                  })
                }
              })
            }
          },
          { default: () => 'Hapus' }
        )
      ],
      key: 'action',
      className: 'w-2/12'
    }
  ]
}

const columns = createColumns()
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 50, 100],
  onChange: (page: number) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  }
})
onBeforeMount(() => {
  Api.get('/posts').then((res) => {
    data.value = res
  }).catch((err) => {
    console.log(err)
  })
})
</script>
