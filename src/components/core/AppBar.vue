<script setup lang="ts">
import NavBar from "@/components/core/NavBar.vue";

const drawer = ref(true)
</script>

<template>
  <v-app-bar density="comfortable">
   <template #prepend>
     <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer" v-if="$vuetify.display.mobile"></v-app-bar-nav-icon>
     <v-img
       src="@/assets/cesizen_logo_small.png"
       alt="Logo CESIZen"
       height="100"
       width="100"
       contain
     ></v-img>

   </template>
    <v-toolbar-title>CESIZen</v-toolbar-title>
    <MenuUser/>
  </v-app-bar>

  <NavBar :drawer="drawer"/>
</template>

<style scoped lang="sass">

</style>
