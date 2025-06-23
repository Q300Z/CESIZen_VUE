<script lang="ts" setup>
import NavBar from "@/components/core/NavBar.vue";

const drawer = ref(true)
const isDev = import.meta.env.DEV;
</script>

<template>
  <v-app-bar
    density="comfortable"
    elevation="2"
  >
    <v-app-bar-title>
      CESIZen <span v-if="isDev"> - DEV</span>
    </v-app-bar-title>
    <template #prepend>
      <v-app-bar-nav-icon
        v-if="$vuetify.display.mobile"
        variant="text"
        @click.stop="drawer = !drawer"
      />
      <RouterLink to="/">
        <v-img
          alt="Logo CESIZen"
          aspect-ratio="1/1"
          src="@/assets/cesizen_logo_small.png"
          class="mr-5 ml-10"
          width="50"
        />
      </RouterLink>
    </template>

    <MenuUser />
  </v-app-bar>

  <NavBar :drawer="drawer" />
</template>

<style lang="sass" scoped>

</style>
