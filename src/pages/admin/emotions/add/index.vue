<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import type {Emotion} from "@/types"
import axios from "@/lib/axios"
import {ref} from "vue"

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const router = useRouter()
const emotion: Ref<Emotion | undefined> = ref()

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const base: Ref<boolean> = ref(false)

const submit = async (formData: FormData) => {
  try {
    if (!base.value)
      await axios.post('/emotions', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    else
      await axios.post('/emotions/base', formData, {headers: {'Content-Type': 'multipart/form-data'}})


    alert.value = 'Emotion créé avec succès.'
    alertType.value = 'success'

    setTimeout(() => {
      router.push(`/admin/emotions`)
    }, 500)

  } catch (error) {
    console.error("Erreur lors de la création de l'emotion :", error)
    alert.value = "Une erreur est survenue lors de la création de l'emotion."
    alertType.value = 'error'
  }
}
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">
      Ajout d’une emotion
    </h1>

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
    <v-switch
      v-model="base"
      color="primary"
      inset
      label="Emotion de base ?"
    />
    <EmotionForm
      :base="base"
      :model-value="emotion"
      @submit="submit"
    />
  </v-container>
</template>

<style scoped>
</style>
