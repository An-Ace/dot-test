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
    <div class="flex gap-2">
      <div style="justify-content: flex-start">
        <n-button
          round
          type="warning"
          @click.prevent="handleValidateButtonClick('put')"
        >
          Update Keseluruhan (PUT)
        </n-button>
      </div>
      <div style="justify-content: flex-end">
        <n-button
          round
          type="info"
          @click.prevent="handleValidateButtonClick('patch')"
        >
          Update Sebagian (PATCH)
        </n-button>
      </div>
    </div>
    <div>*Note:</div>
    <div>
      - PUT: semua field harus diisi (Kosong = "" (Empty String)).
    </div>
    <div>
      - PATCH: field yang tidak diisi akan diabaikan.
    </div>
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
  NInputNumber,
  useModal
} from 'naive-ui'
import { toast } from 'vue3-toastify';
import Api from '../helpers/api';

const props = defineProps<{
  ids: number[],
  onUpdated: (posts : { id: number, userId: number, title: string, body: string }[]) => void
}>()

const modal = useModal()

interface ModelType {
  userId: number | null
  title: string | null
  body: string | null
}

const formRef = ref<FormInst | null>(null)
const model = ref<ModelType>({
  userId: null,
  title: '',
  body: ''
})

const rules: FormRules = {
  userId: [
    {
      trigger: 'blur',
      type: 'number',
    }
  ],
  title: [
    {
      trigger: 'blur'
    }
  ],
  body: [
    {
      trigger: 'blur'
    }
  ],
}

function handleValidateButtonClick(method: "put" | "patch") {
  if (method === "put" && !model.value.userId) return toast.error('PUT Request User ID is required')
  else if (model.value.userId && typeof model.value.userId !== 'number') return toast.error('PUT Request User ID is Number value')
  formRef.value?.validate(
    (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        Api[method](`/posts/${JSON.stringify(props.ids)}/many`, {
          userId: model.value.userId || undefined,
          title: model.value.title || undefined,
          body: model.value.body || undefined
        }).then((response) => {
          props.onUpdated(response)
          modal.destroyAll()
        })
      } else {
        console.log(errors)
        toast.error('Invalid')
      }
    }
  )
}
</script>
