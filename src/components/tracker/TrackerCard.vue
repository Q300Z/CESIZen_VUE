<script lang="ts" setup>
import type {Tracker} from "@/types";

const props = defineProps<{
  tracker: Tracker;
}>();

const getImage = computed(()=> import.meta.env.VITE_API_URL+props.tracker.emotion.image)

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
<div class="d-flex justify-center">
  <v-img :src="getImage" height="200" width="200" />
</div>
    <v-card-title>{{ tracker.emotion.name }}</v-card-title>
    <v-card-subtitle>{{ truncateContent(tracker.description,100) }}</v-card-subtitle>
    <v-card-text>
      <slot :item="tracker" name="content">
      </slot>
    </v-card-text>
    <v-card-actions>
      <slot :item="tracker" name="action"></slot>
    </v-card-actions>
  </v-card>
</template>

<style lang="sass" scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
