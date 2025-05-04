<script setup lang="ts">
import NavBar from "@/components/core/NavBar.vue";

const drawer = ref(true)
</script>

<template>
  <v-app-bar color="primary" density="comfortable">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="$vuetify.display.mobile"></v-app-bar-nav-icon>
    <v-toolbar-title>CESIZen</v-toolbar-title>
    <v-btn icon="mdi-account" variant="text"></v-btn>
  </v-app-bar>

  <NavBar :drawer="drawer"/>
</template>

<style scoped lang="sass">

</style>
