<script lang="ts" setup>
import {definePage} from 'unplugin-vue-router/runtime'
import {useRoute, useRouter} from 'vue-router'
import axios from '@/lib/axios'
import type {APIResponse, RouteParams, User} from '@/types'
import {onMounted, ref} from 'vue'
import {useUserStore} from '@/stores/user'
import ProfilCard from '@/components/profile/ProfilCard.vue'
import type {AxiosResponse} from "axios";

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
})

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const user = ref<User | null>(null)

onMounted(async () => {
  const {id} = route.params as RouteParams
  const userId = Number(id)

  try {
    const res: AxiosResponse<APIResponse<User>> = await axios.get(`users/${userId}`)
    if (res.status === 200 && res.data.data) {
      store.updateUser(res.data.data)
      user.value = res.data.data
    } else {
      console.error("Erreur lors de la récupération de l'utilisateur")
    }
  } catch (err) {
    console.error(`Utilisateur avec l'ID ${id} introuvable`, err)
    router.back()
  }
})
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
    >
      <template #action="{item}">
        <v-btn
          v-role="['admin']"
          :to="'/admin/users/edit/'+item.id"
          prepend-icon="mdi-pencil"
          size="small"
          variant="tonal"
        >
          Modifier
        </v-btn>
      </template>
    </ProfilCard>
  </v-container>
</template>

<style lang="sass" scoped>
</style>
