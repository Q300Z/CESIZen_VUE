<script lang="ts" setup>
import {definePage} from "unplugin-vue-router/runtime"
import {useRoute, useRouter} from "vue-router"
import axios from "@/lib/axios"
import type {User} from "@/types"
import {ref} from "vue"
import ProfilForm from "@/components/profile/ProfilForm.vue"
import {useUserStore} from "@/stores/user.ts"

definePage({
  meta: {
    requiresAuth: true,
  },
})

const route = useRoute()
const router = useRouter()
const store = useUserStore()

const user: ComputedRef<User> = computed(() => store.getUser)

const alert = ref('')
const alertType = ref<'success' | 'error'>('success')

const submit = async (formData: Partial<User>) => {
  try {
    if (!user.value) return

    const res = await axios.put(`/users/${user.value.id}`, {
      id: user.value.id,
      email: formData.email,
      name: formData.name,
      role: formData.role,
    })
    console.log("Utilisateur mis à jour :", res.data.data)

    alert.value = 'Profil mis à jour avec succès.'
    alertType.value = 'success'

    // Optionnel : attendre 1-2 secondes avant de rediriger
    setTimeout(() => {
      router.push("/profil")
    }, 1500)

  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur :", error)
    alert.value = "Une erreur est survenue lors de la mise à jour du profil."
    alertType.value = 'error'
  }
}
</script>

<template>
  <v-container>
    <h1 class="text-h5 mb-4">
      Modification du profil
    </h1>

    <v-alert
      v-if="alert"
      :type="alertType"
      border="start"
      class="mb-4"
      closable
      variant="tonal"
      @click:close="alert = ''"
    >
      {{ alert }}
    </v-alert>

    <v-card
      v-if="!user"
      title="Chargement du profil..."
    />
    <ProfilForm
      v-else
      :model-value="user"
      @submit="submit"
    />
  </v-container>
</template>

<style scoped>
</style>
