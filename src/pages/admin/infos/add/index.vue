<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import type {Article} from "@/types"
import axios from "@/lib/axios"
import ProfilForm from "@/components/profile/ProfilForm.vue"
import {articleouter} from "vue-router"
import {ref} from "vue"

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const router = useRouter()
const article: Ref<Article | undefined> = ref()

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const submit = async (formData: Partial<Article>) => {
  try {
    const res = await axios.post('/articles', formData)
    console.log("Utilisateur créé :", res.data.data)

    alert.value = 'Utilisateur créé avec succès.'
    alertType.value = 'success'

    setTimeout(() => {
      router.push(`/admin/articles/${res.data.data.id}`)
    }, 1500)

  } catch (error) {
    console.error("Erreur lors de la création du profil :", error)
    alert.value = "Une erreur est survenue lors de la création de l'utilisateur."
    alertType.value = 'error'
  }
}
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">Ajout d’un utilisateur</h1>

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

    <ProfilForm :model-value="article" @submit="submit"/>
  </div>
</template>

<style scoped>
</style>
