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

const store = useUserStore()

const user: ComputedRef<User> = computed(() => store.getUser)

</script>

<template>
  <v-container class="d-flex flex-column ga-5 align-center">
    <v-card v-if="!user" title="Chargement du profil..."></v-card>
    <ProfilCard v-else :user="user" class="w-sm-100 w-md-66">
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
  </v-container>
</template>

<style lang="sass" scoped>
</style>
