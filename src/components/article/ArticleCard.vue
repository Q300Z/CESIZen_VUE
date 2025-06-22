<script lang="ts" setup>
import type {Article} from "@/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  <v-card>
    <v-card-title>{{ article.title }}</v-card-title>
    <v-card-subtitle>{{ article.description }}</v-card-subtitle>

    <v-card-text>
      <slot
        :item="article"
        name="content"
      >
        <div v-html="truncateContent(article.content, 100)" />
      </slot>
    </v-card-text>

    <v-card-actions>
      <slot
        :item="article"
        name="action"
      />
    </v-card-actions>
  </v-card>
</template>

<style lang="sass" scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
