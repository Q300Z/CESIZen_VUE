<script setup lang="ts">
import type { Article } from "@/types";

const props = defineProps<{
  article: Article;
}>();

// Fonction pour tronquer le contenu
const truncateContent = (content: string, maxLength: number) => {
  if (content.length <= maxLength) {
    return content;
  }
  return content.slice(0, maxLength) + '...'; // Ajoute des points de suspension
};
</script>

<template>
  <v-card >
    <v-card-title>{{ article.title }}</v-card-title>
    <v-card-subtitle>{{ article.description }}</v-card-subtitle>

    <v-card-text>
      <slot name="content" :item="article">
        <div v-html="truncateContent(article.content, 100)"></div>
      </slot>
    </v-card-text>

    <v-card-actions>
      <slot name="action" :item="article"></slot>
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="sass">
/* Ajoutez vos styles ici si nécessaire */
</style>
