<script lang="ts" setup>
import {definePage} from 'unplugin-vue-router/runtime'
import axios from '@/lib/axios'
import type {APIResponse, Article, RouteParams} from '@/types'
import {onMounted, ref} from 'vue'
import {useArticleStore} from '@/stores/article'
import type {AxiosResponse} from "axios";

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const route = useRoute()
const router = useRouter()
const store = useArticleStore()

const article = ref<Article | null>(null)

onMounted(async () => {
  const {id} = route.params as RouteParams
  const articleId = Number(id)

  try {
    const res: AxiosResponse<APIResponse<Article>> = await axios.get(`articles/${articleId}`)
    if (res.status === 200 && res.data.data) {
      store.updateArticle(res.data.data)
      article.value = res.data.data
    } else {
      console.error("Erreur lors de la récupération de l'utilisateur")
    }
  } catch (err) {
    console.error(`Utilisateur avec l'ID ${id} introuvable`, err)
    router.back()
  }
})
</script>

<template>
  <v-container class="d-flex flex-column ga-5 align-center">
    <v-card
      v-if="!article"
      title="Chargement de l'article..."
    />
    <ArticleCard
      v-else
      :article="article"
      class="w-sm-100 w-md-66"
    >
      <template #action="{item}">
        <v-btn
          v-role="['admin']"
          :to="'/admin/infos/edit/'+item.id"
          prepend-icon="mdi-pencil"
          size="small"
          variant="tonal"
        >
          Modifier
        </v-btn>
      </template>
    </ArticleCard>
  </v-container>
</template>

<style lang="sass" scoped>
</style>
