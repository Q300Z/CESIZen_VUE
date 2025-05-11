<script lang="ts" setup>

</script>

<template>
  <v-main>
    <v-app-bar density="comfortable" elevation="2" title="CESIZen">
      <template #prepend>
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
      <v-btn to="/auth/login" v-if="!$vuetify.display.mobile">Connexion</v-btn>
      <v-btn to="/auth/register" v-if="!$vuetify.display.mobile">Inscription</v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>
    <div class="pa-5 d-flex flex-column align-center justify-center h-75">
      <router-view/>
    </div>
  </v-main>
</template>

<style lang="sass" scoped>

</style>
