<template>
  <n-form ref="formRef" :model="model" :rules="rules">
    <n-form-item path="userId" label="User ID">
      <n-input-number v-model:value="model.userId" @keydown.enter.prevent class="w-full"/>
    </n-form-item>
    <n-form-item path="title" label="Title">
      <n-input v-model:value="model.title" @keydown.enter.prevent type="textarea"/>
    </n-form-item>
    <n-form-item path="body" label="Body">
      <n-input v-model:value="model.body" @keydown.enter.prevent type="textarea"/>
    </n-form-item>
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button
            round
            type="primary"
            @click="handleValidateButtonClick"
          >
            Tambahkan
          </n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type {
  FormInst,
  FormRules,
  FormValidationError
} from 'naive-ui'
import { 
  NForm,
  NInput,
  NFormItem,
  NButton,
  NRow,
  NCol,
  NInputNumber
} from 'naive-ui'
import { toast } from 'vue3-toastify';
import Api from '../helpers/api';

const props = defineProps<{
  onAdded: ({ id, userId, title, body }: { id: number, userId: number, title: string, body: string }) => void
}>()

interface ModelType {
  userId: number | null
  title: string | null
  body: string | null
}

const formRef = ref<FormInst | null>(null)
const model = ref<ModelType>({
  userId: null,
  title: null,
  body: null
})

const rules: FormRules = {
  userId: [
    {
      required: true,
      trigger: 'blur',
      type: 'number'
    }
  ],
  title: [
    {
      required: true,
      trigger: 'blur'
    }
  ],
  body: [
    {
      required: true,
      trigger: 'blur'
    }
  ],
}

function handleValidateButtonClick(e: MouseEvent) {
  e.preventDefault()
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        Api.post('/posts', model.value).then((response) => {
          toast.success('Post berhasil ditambahkan')
          props.onAdded({
            id: response.id,
            userId: response.userId,
            title: response.title,
            body: response.body
          })
        })
      } else {
        console.log(errors)
        toast.error('Invalid')
      }
    }
  )
}
</script>
