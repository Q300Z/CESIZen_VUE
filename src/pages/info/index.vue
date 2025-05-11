<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {useArticleStore} from "@/stores/article.ts";
import type {APIResponse, Article} from "@/types";
import type {AxiosResponse} from "axios";
import axios from "@/lib/axios.ts";
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    requiresAuth: false,
  },
});

const store = useArticleStore();
const articles = computed(() => store.articles);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const res: AxiosResponse<APIResponse<Article[]>> = await axios.get("/articles");
    if (res.status === 200 && res.data.data) {
      store.setArticles(res.data.data);
    } else {
      throw new Error("Erreur lors de la récupération des articles");
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des articles", err);
    error.value = "Impossible de charger les articles.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container>
    <v-data-iterator
      :items="articles"
      :loading="loading"
      class="mt-4"
      items-per-page="6"
    >
      <template #default="{ items }">
        <div class="d-flex justify-center flex-wrap ga-6">
          <div v-for="article in items" :key="article.raw.id" style="width: 300px; max-height: 300px">
            <ArticleCard :article="article.raw" >
              <template #action="{item}">
                <v-btn :to="`/info/${item.id}`" color="primary">Lire la suite</v-btn>
              </template>
            </ArticleCard>
          </div>
          </div>
      </template>

      <template #no-data>
        <v-alert type="info">Aucun article trouvé.</v-alert>
      </template>

      <template #loader>
        <v-row>
          <v-col v-for="n in 6" :key="n" cols="12" md="4" sm="6">
            <v-skeleton-loader type="card"/>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<style lang="sass" scoped>
</style>
