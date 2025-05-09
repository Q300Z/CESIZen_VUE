<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import type {Emotion, EmotionBase} from "@/types"
import axios from "@/lib/axios"
import {ref} from "vue"

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const router = useRouter()
const emotion: Ref<EmotionBase | undefined> = ref()

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const submit = async (formData: FormData) => {
  try {
    let res = await axios.post('/emotions', formData, {headers: {'Content-Type': 'multipart/form-data'}})

    console.log("Emotion créé :", res.data.data)

    alert.value = 'Emotion de base créé avec succès.'
    alertType.value = 'success'

    setTimeout(() => {
      router.push(`/admin/emotions/base`)
    }, 1500)

  } catch (error) {
    console.error("Erreur lors de la création de l'emotion :", error)
    alert.value = "Une erreur est survenue lors de la création de l'emotion."
    alertType.value = 'error'
  }
}
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">Ajout d’une emotion de base</h1>

    <v-alert
      v-if="alert"
      :type="alertType"
      border="start"
      class="mb-4"
      closable
      variant="tonal"
      @click:close="alert = ''"
    >
      {{ alert }}
    </v-alert>
    <EmotionForm :model-value="emotion" @submit="submit" :base="true"/>
  </v-container>
</template>

<style scoped>
</style>
