<script lang="ts" setup>
import {useUserStore} from '@/stores/user'

const store = useUserStore()

const logout = () => {
  store.logout()
}

const getRole = computed(() => {
  if (store.user) {
   switch (store.user.role) {
      case 'admin':
        return 'Administrateur'
      default:
        return 'Utilisateur'
   }
  }
  return 'Anonymous'
})

</script>

<template>
  <v-list-item
    v-if="store.isLoggedIn && store.user"
    :title="store.user.name+' - '+getRole"
    nav
  >
    <template #append>
      <v-btn
        :to="'/profile/'+store.user.id"
        color="primary"
        icon="mdi-account"
        variant="text"
      />
      <v-btn
        color="red"
        icon="mdi-logout"
        variant="text"
        @click.prevent="logout"
      />
    </template>
  </v-list-item>
  <v-list-item
    v-else
    title="Login"
  >
    <template #append>
      <v-btn
        color="primary"
        icon="mdi-login"
        to="/auth/login"
        variant="text"
      />
    </template>
  </v-list-item>

</template>

<style lang="sass" scoped>

</style>
