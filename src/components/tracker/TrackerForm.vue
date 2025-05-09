<script lang="ts" setup>
import { type Tracker } from '@/types'
import { useEmotionStore } from "@/stores/emotion.ts"
import { useTrackerStore } from "@/stores/tracker.ts"
import { ref, toRefs, watch, computed } from 'vue'

const props = defineProps<{
  modelValue: Tracker | undefined
}>()

const emit = defineEmits<{
  (e: 'submit', form: Partial<Tracker>): void
}>()

const { modelValue } = toRefs(props)

const store = useTrackerStore()
const emotionStore = useEmotionStore()

const emotions = computed(() => emotionStore.emotions)

const form = ref<Partial<Tracker>>({
  description: '',
  emotionID: undefined,
})

const image = ref('/robot-happy-outline.svg')
const getEmotion = computed(()=>form.value.emotionID?emotionStore.getEmotionById(form.value.emotionID):{name:"Selection une émotion"})

// Mise à jour de l'image quand l'emotionID change
watch(() => form.value.emotionID, (id) => {
  if (id) {
    const emotion = emotionStore.getEmotionById(id)
    image.value =import.meta.env.VITE_API_URL+ emotion?.image || ''
  } else {
    image.value = ''
  }
})

// Remplissage du formulaire si édition
watch(modelValue, (value) => {
  if (value) {
    form.value = { ...value }

    // Met à jour l'image au chargement initial
    if (value.emotionID) {
      const emotion = emotionStore.getEmotionById(value.emotionID)
      image.value = import.meta.env.VITE_API_URL+emotion?.image || ''
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', form.value)
}
</script>


<template>
  <v-form @submit.prevent="handleSubmit">
    <div class="d-flex justify-center flex-column align-center">
      <v-img :src="image" height="200" width="200" v-if="image"></v-img>
      <h1>{{getEmotion?.name}}</h1>
    </div>
      <v-combobox
      v-model="form.emotionID"
      :items="emotions"
      item-title="name"
      item-value="id"
      label="Emotion"
      required
      :return-object="false"
    />

    <v-textarea v-model="form.description" auto-grow counter label="Description"></v-textarea>

    <v-btn class="mt-4" color="primary" type="submit">Valider</v-btn>
  </v-form>
</template>

<style scoped>
</style>
