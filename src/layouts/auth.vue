<script lang="ts" setup>

</script>

<template>
  <v-main>
    <v-app-bar
      density="comfortable"
      elevation="2"
      title="CESIZen"
    >
      <template #prepend>
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
      <v-btn
        v-if="!$vuetify.display.mobile"
        to="/auth/login"
      >
        Connexion
      </v-btn>
      <v-btn
        v-if="!$vuetify.display.mobile"
        to="/auth/register"
      >
        Inscription
      </v-btn>
      <v-spacer />
    </v-app-bar>
    <div class="pa-5 d-flex flex-column align-center justify-center h-75">
      <router-view />
    </div>
  </v-main>
</template>

<style lang="sass" scoped>

</style>
