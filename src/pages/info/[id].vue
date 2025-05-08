<script lang="ts" setup>

import {useArticleStore} from "@/stores/article.ts";
import {onMounted} from "vue";
import type {APIResponse, Article, RouteParams} from "@/types";
import type {AxiosResponse} from "axios";
import axios from "@/lib/axios.ts";

const store = useArticleStore()
const router = useRouter()
const route = useRoute()

const article: Ref<Article | null> = ref(null)

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
  <div class="d-flex flex-column ga-5 align-center">
    <v-card v-if="!article" title="Chargement du article..."></v-card>
    <ArticleCard v-else :article="article" class="w-sm-100 w-md-66">
      <template #content="{item}">
        <div v-html="item.content"></div>
      </template>
    </ArticleCard>
  </div>
</template>

<style lang="sass" scoped>

</style>
