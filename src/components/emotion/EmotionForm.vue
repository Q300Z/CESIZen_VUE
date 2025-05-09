<script lang="ts" setup>
import { type Emotion, type EmotionBase } from '@/types'
import { toRefs, ref, watch, computed, onMounted, type Ref } from 'vue'
import { useEmotionStore } from "@/stores/emotion.ts"

const store = useEmotionStore()

const props = defineProps<{
  modelValue: Partial<Emotion | EmotionBase> | undefined
  base?: boolean // true = EmotionBase, false/undefined = Emotion
}>()

const emit = defineEmits<{
  (e: 'submit', form: Partial<Emotion | EmotionBase>): void
}>()

const { modelValue } = toRefs(props)

const form: Ref<Partial<Emotion>> = ref({
  name: '',
  emotionBaseID: undefined,
})

// Liste des émotions de base
const emotionBases = computed(() => store.emotionsBase || [])

// Remplissage du formulaire en cas d'édition
watch(modelValue, (value) => {
  if (value) {
    form.value = { ...value }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', form.value)
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
      item-title="name"
      item-value="id"
      label="Base d'émotion"
      required
      :return-object="false"
    />

    <v-btn class="mt-4" color="primary" type="submit">Valider</v-btn>
  </v-form>
</template>



<style scoped>
</style>
