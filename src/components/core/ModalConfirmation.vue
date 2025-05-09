<script lang="ts" setup>
const props = defineProps<{
  title?: string;
  description?: string;
}>();

const emit = defineEmits<{
  (e: 'confirm'): void;
}>();
</script>

<template>
  <v-dialog scrim>
    <template v-slot:activator="{ props: activatorProps }">
      <slot :props="activatorProps" name="activation">
        <v-btn v-bind="activatorProps">
          Confirmation
        </v-btn>
      </slot>
    </template>

    <template v-slot:default="{ isActive }">
      <div class="d-flex justify-center">
      <v-card max-width="800">
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
      </div>
    </template>
  </v-dialog>
</template>

<style lang="sass" scoped>
/* Ajoutez vos styles ici si nécessaire */
</style>
