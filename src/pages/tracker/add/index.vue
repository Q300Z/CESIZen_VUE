<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import type {Tracker} from "@/types"
import axios from "@/lib/axios"
import {ref} from "vue"

definePage({
  meta: {
    requiresAuth: true
  },
})

const router = useRouter()
const tracker: Ref<Tracker | undefined> = ref()

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const submit = async (formData: Partial<Tracker>) => {
  try {
    let res = await axios.post('/trackers', formData)


    console.log("Tracker créé :", res.data.data)

    alert.value = 'Tracker créé avec succès.'
    alertType.value = 'success'

    setTimeout(() => {
      router.push(`/tracker`)
    }, 1500)

  } catch (error:any) {
    console.error("Erreur lors de la création du tracker :", error)
    alert.value = error.response.data.message || "Une erreur est survenue lors de la création du tracker."
    alertType.value = 'error'
  }
}
</script>

<template>
  <v-container>
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
    <TrackerForm
      :model-value="tracker"
      @submit="submit"
    />
  </v-container>
</template>

<style scoped>
</style>
