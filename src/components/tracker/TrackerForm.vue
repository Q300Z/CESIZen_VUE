<script lang="ts" setup>
import {type APIResponse, type Emotion, type Tracker} from '@/types'
import { useEmotionStore } from "@/stores/emotion.ts"
import { useTrackerStore } from "@/stores/tracker.ts"
import { ref, toRefs, watch, computed } from 'vue'
import axios from "@/lib/axios.ts";
import type {AxiosResponse} from "axios";

const props = defineProps<{
  modelValue: Tracker | undefined
}>()

const emit = defineEmits<{
  (e: 'submit', form: Partial<Tracker>): void
}>()

const store = useTrackerStore()
const emotionStore = useEmotionStore()

const { modelValue } = toRefs(props)
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



const emotions = computed(() => emotionStore.emotions)

const form = ref<Partial<Tracker>>({
  description: '',
  emotionID: undefined,
})
watch(() => form.value.emotionID, (id) => {
  if (id) {
    const emotion = emotionStore.getEmotionById(id)
    image.value =import.meta.env.VITE_API_URL+ emotion?.image || ''
  } else {
    image.value = ''
  }
})


const sliderIndex = ref(-1)
watch(sliderIndex, (value) => {
  if (value >= 0 && value < emotions.value.length) {
    form.value.emotionID = emotions.value[value].id
  } else {
    form.value.emotionID = undefined
  }
})

const image = ref('/robot-happy-outline.svg')
const getEmotion = computed(()=>form.value.emotionID?emotionStore.getEmotionById(form.value.emotionID):{name:"Selection une émotion"})

const handleSubmit = () => {
  emit('submit', form.value)
}

onMounted(async () => {
  const res:AxiosResponse<APIResponse<Emotion[]>> = await axios.get('/emotions')
  if(res.status === 200&&res.data.data) {
    emotionStore.setEmotions(res.data.data)
  } else {
    console.error("Erreur lors de la récupération des émotions :", res.statusText)
  }
})
</script>


<template>
  <v-form @submit.prevent="handleSubmit">
    <div class="d-flex justify-center flex-column align-center">
      <v-img :src="image" height="200" width="200" v-if="image"></v-img>
      <h1>{{getEmotion?.name}}</h1>
    </div>
<!--      <v-combobox-->
<!--      v-model="form.emotionID"-->
<!--      :items="emotions"-->
<!--      item-title="name"-->
<!--      item-value="id"-->
<!--      label="Emotion"-->
<!--      required-->
<!--      :return-object="false"-->
<!--    />-->
    <v-slider
      :max="emotions.length-1"
      step="1"
      tick-size="3"
      show-ticks
      v-model="sliderIndex"
      color="primary"
      thumb-label
      class="mt-10"
    >
      <template v-slot:thumb-label="{ modelValue }">
        {{ emotions[modelValue].name }}
      </template>
    </v-slider>

    <v-textarea v-model="form.description" auto-grow counter label="Explique ton émotion..."></v-textarea>

    <v-btn class="mt-4" color="primary" type="submit" :disabled="sliderIndex==-1">Valider</v-btn>
  </v-form>
</template>

<style scoped>
</style>
