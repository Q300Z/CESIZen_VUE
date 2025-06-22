<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import type {Article} from "@/types"
import axios from "@/lib/axios"
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
    console.log("Article créé :", res.data.data)

    alert.value = 'Article créé avec succès.'
    alertType.value = 'success'

    setTimeout(() => {
      router.push(`/admin/infos/${res.data.data.id}`)
    }, 1500)

  } catch (error) {
    console.error("Erreur lors de la création de l'article :", error)
    alert.value = "Une erreur est survenue lors de la création de l'article."
    alertType.value = 'error'
  }
}
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">
      Ajout d’un article
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

    <ArticleForm
      :model-value="article"
      @submit="submit"
    />
  </v-container>
</template>

<style scoped>
</style>
