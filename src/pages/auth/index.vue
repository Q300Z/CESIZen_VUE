<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    layout: 'auth',
    requiresAuth: false,
  },
})
const router = useRouter()
</script>

<template>
  <v-container class="d-flex flex-column h-75 justify-center align-center ga-9">
    <h1>Page d'authentifiaction</h1>
    <div class="d-flex justify-center align-center ga-3">
      <v-btn
        max-height="250"
        max-width="250"
        prepend-icon="mdi-login"
        @click="router.push('/auth/login')"
      >
        Connexion
      </v-btn>
      <v-btn
        max-height="250"
        max-width="250"
        prepend-icon="mdi-account-plus-outline"
        @click="router.push('/auth/register')"
      >
        Inscription
      </v-btn>
    </div>
  </v-container>
</template>

<style lang="sass" scoped>

</style>

