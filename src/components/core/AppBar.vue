<script lang="ts" setup>
import NavBar from "@/components/core/NavBar.vue";

const drawer = ref(true)
const isDev = import.meta.env.DEV;
</script>

<template>
  <v-app-bar density="comfortable" elevation="2">
    <v-app-bar-title>
      CESIZen <span v-if="isDev"> - DEV</span>
    </v-app-bar-title>
    <template #prepend>
      <v-app-bar-nav-icon v-if="$vuetify.display.mobile" variant="text"
                          @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <RouterLink to="/">
        <v-img
          alt="Logo CESIZen"
          contain
          height="50"
          src="@/assets/cesizen_logo_small.png"
          width="100"
        ></v-img>
      </RouterLink>
    </template>

    <MenuUser/>
  </v-app-bar>

  <NavBar :drawer="drawer"/>
</template>

<style lang="sass" scoped>

</style>
