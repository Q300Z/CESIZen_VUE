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
  <v-card :subtitle="user.email" :title="user.name" elevation="3" prepend-icon="mdi-account" :min-width="$vuetify.display.mobile?0:800">
    <v-card-text>
      <div class="d-flex ga-5">
        <div>
          Rôle :
          <v-chip :color="getRoleColor(user.role)" text-color="white">
            {{ user.role }}
          </v-chip>
        </div>
        <v-spacer/>
        <v-btn
          v-role="['admin']"
          :to="'/admin/users/edit/'+user.id"
          prepend-icon="mdi-pencil"
          size="small"
          variant="tonal"
        >
          Modifier
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="sass" scoped>
</style>
