<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime";
import axios from "@/lib/axios.ts";
import {useUserStore} from "@/stores/user.ts";

definePage({
  meta: {
    requiresAuth: true,
  },
})

const store = useUserStore()
const deleteAccount = async () => {
  // Logic to delete the account goes here
  console.log("Account deletion confirmed");
  const res = await axios.delete("/users/me")
  if (res.status === 200) {
    console.log("Account deleted successfully");
    store.logout();
    window.location.href = "/";
  } else {
    console.error("Failed to delete account", res);
  }
};


</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">Voulez-vous vraiment supprimer votre compte ?</h1>
    <p class="text-subtitle-1 mb-4">
      Cette action est irréversible et supprimera toutes vos données associées à ce compte.
    </p>
    <v-btn class="mr-2" color="error" @click="deleteAccount()">
      Supprimer mon compte
    </v-btn>
    <v-btn to="/profil" variant="tonal">
      Annuler
    </v-btn>
  </v-container>
</template>

<style lang="sass" scoped>

</style>
