<script lang="ts" setup>
import {Role, type Article} from '@/types'
import {useArticleStore} from "@/stores/article.ts"

const props = defineProps<{
  modelValue: Article | undefined
}>()

const emit = defineEmits<{
  (e: 'submit', form: Partial<Article>): void
}>()

const {modelValue} = toRefs(props)

const form = ref<Partial<Article>>({
  title: '',
  description: '',
  content:''
})

watch(modelValue, (value) => {
  if (value) {
    form.value = {...value}
  }
}, {immediate: true})

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>

<template>
  <v-form @submit.prevent="handleSubmit">
    <v-text-field
      v-model="form.title"
      label="Nom"
      required
    />

    <v-text-field
      v-model="form.description"
      label="Email"
      required
      type="email"
    />

   <v-textarea v-model="form.content"></v-textarea>

    <v-btn class="mt-4" color="primary" type="submit">Valider</v-btn>
  </v-form>
</template>

<style scoped>
</style>
