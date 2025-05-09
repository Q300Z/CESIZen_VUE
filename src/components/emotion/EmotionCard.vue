<script lang="ts" setup>
import type {Emotion} from "@/types";

const props = defineProps<{
  emotion: Emotion;
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
    <v-card-title>{{ emotion.title }}</v-card-title>
    <v-card-subtitle>{{ emotion.description }}</v-card-subtitle>

    <v-card-text>
      <slot :item="emotion" name="content">
        <div v-html="truncateContent(emotion.content, 100)"></div>
      </slot>
    </v-card-text>

    <v-card-actions>
      <slot :item="emotion" name="action"></slot>
    </v-card-actions>
  </v-card>
</template>

<style lang="sass" scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
