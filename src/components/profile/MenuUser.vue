<script lang="ts" setup>
import {useUserStore} from "@/stores/user.ts";
import type {User} from "@/types";

const router = useRouter();
const store = useUserStore();
const user: ComputedRef<User> = computed(() => store.getUser);

const logout = () => {
  store.logout();
  router.push('/');
}
</script>

<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn v-if="!store.isLoggedIn" prepend-icon="mdi-login" to="/auth/login" variant="text">Se connecter</v-btn>
      <v-btn v-else icon="mdi-account" v-bind="props" variant="text"></v-btn>
    </template>

    <v-card min-width="300">
      <v-list>
        <v-list-item
          :subtitle="user.email"
          :title="user.name+' ('+user.role+')'"
        >
          <template #append>
            <v-btn v-if="!store.isLoggedIn" icon="mdi-login" to="/auth/login" variant="text"></v-btn>
            <v-btn v-else icon="mdi-logout" variant="text" @click.prevent="logout"></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-role="['user','admin']"
          link
          prepend-icon="mdi-cog"
          title="Paramètres du compte"
          to="/profil"
        >
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<style lang="sass" scoped>

</style>
