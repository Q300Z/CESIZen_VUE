<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import axios from "@/lib/axios"
import type {RouteParams, Article} from "@/types"
import {onMounted, ref} from "vue"
import ProfilForm from "@/components/profile/ProfilForm.vue"
import {useArticleStore} from "@/stores/article.ts"

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const article = ref<Article | undefined>(undefined)

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const submit = async (formData: Partial<Article>) => {
  try {
    if (!article.value) return

    const res = await axios.put(`/articles/${article.value.id}`, {
      title:formData.title,
      description:formData.description,
      content:formData.content,
    })
      store.updateArticle(res.data.data)
      console.log("Article mis à jour :", res.data.data)

      alert.value = 'Article mis à jour avec succès.'
      alertType.value = 'success'

      setTimeout(() => {
        router.push(`/admin/infos/${res.data.data.id}`)
      }, 1500)
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'article :", error)
    alert.value = "Une erreur est survenue lors de la mise à jour de l'article."
    alertType.value = 'error'
  }
}

onMounted(async () => {
  const {id} = route.params as RouteParams

  try {
    const res = await axios.get(`/articles/${id}`)
    article.value = res.data.data
    store.updateArticle(res.data.data)
  } catch (error) {
    console.error("Erreur lors du chargement de l'utilisateur :", error)
    router.back()
  }
})
</script>

<template>
  <div>
    <h1 class="text-h5 mb-4">Modification du profil</h1>

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
    <v-card v-if="!article" title="Chargement de l'article..."></v-card>
    <ArticleForm v-else :model-value="article" @submit="submit"/>
  </div>
</template>

<style scoped>
</style>
