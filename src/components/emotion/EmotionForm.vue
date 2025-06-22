<script lang="ts" setup>
import {type Emotion} from '@/types'
import {useEmotionStore} from "@/stores/emotion.ts"
import axios from "@/lib/axios";

const store = useEmotionStore()

const props = defineProps<{
  modelValue: Partial<Emotion> | undefined
  base?: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', form: FormData): void
}>()

const {modelValue} = toRefs(props)

interface EmotionForm extends Emotion {
  images: File | null
}

const form: Ref<Partial<EmotionForm>> = ref({
  name: '',
  images: null,
  emotionBaseID: undefined,
})

const previewUrl = ref<string | null>(null)

watch(() => form.value.images, (file) => {
  if (file instanceof File) {
    previewUrl.value = URL.createObjectURL(file)
  } else {
    previewUrl.value = null
  }
})

// Liste des émotions de base
const emotionBases = computed(() => store.emotionsBase || [])

// Convertit une URL d’image en un File
const urlToFile = async (url: string, fileName: string): Promise<File> => {
  const res = await axios.get(url, {responseType: 'blob'})
  const blob = await res.data
  return new File([blob], fileName, {type: blob.type})
}

watch(modelValue, async (value) => {
  if (value) {
    form.value = {...value}

    if (!props.base && typeof value.image === 'string') {
      const filename = value.image.split('/').pop() || 'image.jpg'
      form.value.images = await urlToFile(value.image, filename)
    }
  }
}, {immediate: true})

const handleSubmit = () => {
  const formData = new FormData()
  formData.append('name', form.value.name || '')

  if (form.value.emotionBaseID !== undefined) {
    formData.append('emotionBaseID', String(form.value.emotionBaseID))
  }

  if (form.value.images instanceof File) {
    const newFileName = `emotion.${form.value.images.name.split('.').pop()}`
    const renamedFile = new File([form.value.images], newFileName, {type: form.value.images.type})

    formData.append('image', renamedFile)
  }

  emit('submit', formData)
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="form.name"
      label="Nom"
      required
    />

    <v-combobox
      v-if="!props.base"
      v-model="form.emotionBaseID"
      :items="emotionBases"
      :return-object="false"
      item-title="name"
      item-value="id"
      label="Base d'émotion"
      required
    />
    <v-file-input
      v-if="!props.base"
      v-model="form.images"
      accept="image/*"
      clearable
      label="Représentation de l'émotion"
    />
    <div class="d-flex justify-center">
      <v-img
        v-if="previewUrl"
        :src="previewUrl"
        max-width="200"
      />
    </div>
    <v-btn
      class="mt-4"
      color="primary"
      type="submit"
    >
      Valider
    </v-btn>
  </v-form>
</template>

<style scoped>
</style>
