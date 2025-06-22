<script lang="ts" setup>
import {definePage} from 'unplugin-vue-router/runtime'
import type {User} from '@/types'
import {useUserStore} from '@/stores/user'
import ProfilCard from '@/components/profile/ProfilCard.vue'

definePage({
  meta: {
    requiresAuth: true,
  },
})

const store = useUserStore()

const user: ComputedRef<User> = computed(() => store.getUser)

</script>

<template>
  <v-container class="d-flex flex-column ga-5 align-center">
    <v-card
      v-if="!user"
      title="Chargement du profil..."
    />
    <ProfilCard
      v-else
      :user="user"
      class="w-sm-100 w-md-66"
    >
      <template #action="{item}">
        <v-btn
          :to="'/profil/edit/'"
          prepend-icon="mdi-pencil"
          size="small"
          variant="tonal"
        >
          Modifier
        </v-btn>
        <v-btn
          :to="'/profil/delete/'"
          color="red"
          prepend-icon="mdi-delete"
          size="small"
          variant="tonal"
        >
          Supprimer le compte
        </v-btn>
      </template>
    </ProfilCard>
  </v-container>
</template>

<style lang="sass" scoped>
</style>
