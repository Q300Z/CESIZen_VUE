<script lang="ts" setup>
import {type Article} from '@/types'

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
  content: ''
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
      label="Titre"
      required
    />

    <v-text-field
      v-model="form.description"
      label="Description"
      required
    />

    <v-textarea
      v-model="form.content"
      auto-grow
      counter
    />

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
