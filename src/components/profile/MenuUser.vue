<script setup lang="ts">
import {useUserStore} from "@/stores/user.ts";
import type {User} from "@/types";

const router = useRouter();
const store = useUserStore();
const user:ComputedRef<User> = computed(()=> store.getUser);

const logout = ()=>{
  store.logout();
  router.push('/');
}
</script>

<template>
<v-menu>
  <template #activator="{ props }">
    <v-btn prepend-icon="mdi-login" variant="text" v-if="!store.isLoggedIn" to="/auth/login">Se connecter</v-btn>
    <v-btn icon="mdi-account" variant="text" v-bind="props" v-else></v-btn>
  </template>

  <v-card min-width="300">
    <v-list>
      <v-list-item
        :subtitle="user.email"
        :title="user.name+' ('+user.role+')'"
      >
        <template #append>
          <v-btn icon="mdi-login" variant="text" v-if="!store.isLoggedIn" to="/auth/login"></v-btn>
          <v-btn icon="mdi-logout" variant="text" v-else @click.prevent="logout"></v-btn>
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
        to="/profile"
      >
      </v-list-item>
    </v-list>
  </v-card>
</v-menu>
</template>

<style scoped lang="sass">

</style>
