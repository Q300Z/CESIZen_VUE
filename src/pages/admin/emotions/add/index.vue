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

const base:Ref<boolean> = ref(false)

const submit = async (formData: Partial<Emotion>) => {
  try {
    let res=null;
    if(base)
     res = await axios.post('/emotions', formData)
    else
     res = await axios.post('/emotions/base', formData)

    console.log("Emotion créé :", res.data.data)

    alert.value = 'Emotion créé avec succès.'
    alertType.value = 'success'

    setTimeout(() => {
      router.push(`/admin/emotions`)
    }, 1500)

  } catch (error) {
    console.error("Erreur lors de la création de l'emotion :", error)
    alert.value = "Une erreur est survenue lors de la création de l'emotion."
    alertType.value = 'error'
  }
}
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">Ajout d’un emotion</h1>

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
    <v-switch label="Emotion de base ?" color="primary" inset v-model="base"></v-switch>
    <EmotionForm :model-value="emotion" @submit="submit" :base="base"/>
  </div>
</template>

<style scoped>
</style>
