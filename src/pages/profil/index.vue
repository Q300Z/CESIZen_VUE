<script lang="ts" setup>
import {definePage} from 'unplugin-vue-router/runtime'
import {useRoute, useRouter} from 'vue-router'
import axios from '@/lib/axios'
import type {APIResponse, User} from '@/types'
import {onMounted} from 'vue'
import {useUserStore} from '@/stores/user'
import ProfilCard from '@/components/profile/ProfilCard.vue'
import type {AxiosResponse} from "axios";

definePage({
  meta: {
    requiresAuth: true,
  },
})

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const user: ComputedRef<User> = computed(() => store.getUser)

onMounted(async () => {
  if (!store.isLoggedIn)
    await router.push('/auth/login')


  try {
    const res: AxiosResponse<APIResponse<User>> = await axios.get(`users/${user.value.id}`)
    if (res.status === 200 && res.data.data) {
      store.setUser(res.data.data)
    } else {
      console.error("Erreur lors de la récupération de l'utilisateur")
    }
  } catch (err) {
    console.error(`Utilisateur avec l'ID ${user.value.id} introuvable`, err)
    router.back()
  }
})
</script>

<template>
  <div class="d-flex flex-column ga-5 align-center">
    <v-card v-if="!user" title="Chargement du profil..."></v-card>
    <ProfilCard v-else :user="user">
      <template #action="{item}">
        <v-btn
          :to="'/profil/edit/'"
          prepend-icon="mdi-pencil"
          size="small"
          variant="tonal"
        >
          Modifier
        </v-btn>
      </template>
    </ProfilCard>
  </div>
</template>

<style lang="sass" scoped>
</style>
