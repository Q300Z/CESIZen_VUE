<script lang="ts" setup>
import NavBar from "@/components/core/NavBar.vue";

const drawer = ref(true)
</script>

<template>
  <v-app-bar density="comfortable">
    <template #prepend>
      <v-app-bar-nav-icon v-if="$vuetify.display.mobile" variant="text"
                          @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        alt="Logo CESIZen"
        contain
        height="100"
        src="@/assets/cesizen_logo_small.png"
        width="100"
      ></v-img>

    </template>
    <v-toolbar-title>CESIZen</v-toolbar-title>
    <MenuUser/>
  </v-app-bar>

  <NavBar :drawer="drawer"/>
</template>

<style lang="sass" scoped>

</style>
