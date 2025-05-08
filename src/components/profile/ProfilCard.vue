<script lang="ts" setup>

import {Role, type User} from "@/types";

const props = defineProps<{
  user: User
}>()

const getRoleColor = (role: Role) => {
  switch (role) {
    case 'admin':
      return 'red'
    case 'user':
      return 'blue'
    default:
      return 'green'
  }
}

</script>

<template>
  <v-card :min-width="$vuetify.display.mobile?0:800" :subtitle="user.email" :title="user.name" elevation="3"
          prepend-icon="mdi-account">
    <v-card-text>
      <div class="d-flex ga-5">
        <div>
          Rôle :
          <v-chip :color="getRoleColor(user.role)" text-color="white">
            {{ user.role }}
          </v-chip>
        </div>
        <v-spacer/>
        <slot :item="user" name="action"></slot>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
</style>
