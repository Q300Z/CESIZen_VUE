<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useArticleStore } from "@/stores/article.ts";
import type { APIResponse, Article } from "@/types";
import type { AxiosResponse } from "axios";
import axios from "@/lib/axios.ts";
import { definePage } from "unplugin-vue-router/runtime";

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
      items-per-page="6"
      class="mt-4"
    >
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="article in items"
            :key="article.raw.id"
            cols="12"
            sm="6"
            md="4"
          >
            <ArticleCard :article="article.raw">
              <template #action="{item}">
                <v-btn :to="`/info/${item.id}`" color="primary">Lire la suite</v-btn>
              </template>
            </ArticleCard>

          </v-col>
        </v-row>
      </template>

      <template #no-data>
        <v-alert type="info">Aucun article trouvé.</v-alert>
      </template>

      <template #loader>
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="n in 6" :key="n">
            <v-skeleton-loader type="card" />
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<style scoped lang="sass">
</style>
