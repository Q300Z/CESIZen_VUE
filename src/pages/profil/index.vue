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
const appVersion = import.meta.env.VITE_FRONT_VERSION
const apiUrl = import.meta.env.VITE_API_URL
const mode = import.meta.env.MODE
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
      <template #action>
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
    <v-card
      v-if="user.role== 'admin'"
      :min-width="$vuetify.display.mobile?0:800"
      class="w-sm-100 w-md-66"
      title="Configuration de l'application"
    >
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Paramètre
              </th>
              <th class="text-left">
                Valeur
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Version de l'application</td>
              <td>{{ appVersion }}</td>
            </tr>
            <tr>
              <td>API URL</td>
              <td>{{ apiUrl }}</td>
            </tr>
            <tr>
              <td>Mode de développement</td>
              <td>{{ mode }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style lang="sass" scoped>
</style>
