<script setup lang="ts">
const props = defineProps<{
  title?: string;
  description?: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
</script>

<template>
  <v-dialog>
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activation" :props="activatorProps">
      <v-btn v-bind="activatorProps">
        Confirmation
      </v-btn>
      </slot>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title>
          <slot name="titre">{{ props.title }}</slot> <!-- Utilisation de la prop title -->
        </v-card-title>
        <v-card-text>
          <slot name="description">{{ props.description }}</slot> <!-- Utilisation de la prop description -->
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="emit('confirm');isActive.value=false"
          >
          Confirmer
          </v-btn>
          <v-btn
            text
            @click="isActive.value=false"
          >
          Annuler
          </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped lang="sass">
/* Ajoutez vos styles ici si nécessaire */
</style>
