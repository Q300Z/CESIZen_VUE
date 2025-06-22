<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {definePage} from 'unplugin-vue-router/runtime';
import {useUserStore} from '@/stores/user.ts';
import type {APIResponse, AuthResponse} from "@/types";
import axios from "@/lib/axios.ts";
import type {AxiosResponse} from "axios";

definePage({
  meta: {
    layout: 'auth',
    requiresAuth: false,
  },
});

const store = useUserStore();
const router = useRouter();

onMounted(() => {
  if (store.isLoggedIn) {
    router.push({name: '/'});
  }
});

const formValid = ref(false);
const email = ref('');
const emailRules = ref([
  (v: string) => !!v || 'L\'email est requis',
  (v: string) => /.+@.+\..+/.test(v) || 'Le format de l\'email est incorrect',
]);

const password = ref('');
const passwordRules = ref([
  (v: string) => !!v || 'Le mot de passe est requis',
]);

const errorMessage = ref('');

const submit = async () => {
  errorMessage.value = ''; // reset avant tentative
  try {
    const response: AxiosResponse<APIResponse<AuthResponse>> = await axios.post('login', {
      email: email.value,
      password: password.value,
    });

    if (response.status === 200 && response.data.data) {
      store.setToken(response.data.data.token);
      store.setUser(response.data.data.user);
      router.push({name: '/'});
    }
  } catch (error: unknown) {
    console.error('Erreur lors de la connexion:', error);
    errorMessage.value = error?.response?.data?.message || 'Erreur lors de la connexion. Veuillez vérifier vos identifiants.';
  }
};
</script>

<template>
  <v-card
    max-width="800"
    min-width="400"
    subtitle="Entrez vos identifiants"
    title="Connexion"
  >
    <template #text>
      <div class="d-flex flex-column ga-3">
        <v-form v-model="formValid">
          <v-alert
            v-if="errorMessage"
            class="mb-4"
            closable
            type="error"
            variant="outlined"
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            autocomplete="username"
            label="Email"
            type="email"
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            autocomplete="current-password"
            label="Mot de passe"
            type="password"
          />

          <div class="d-flex flex-column ga-2">
            <v-btn
              block
              variant="text"
              @click="router.push({ name: '/auth/forgot/' })"
            >
              Oubli de mot de passe
            </v-btn>
            <v-btn
              block
              color="primary"
              @click="submit"
            >
              Connexion
            </v-btn>
            <v-btn
              block
              color="secondary"
              @click="router.push({ name: '/auth/register/' })"
            >
              Inscription
            </v-btn>
          </div>
        </v-form>
      </div>
    </template>
  </v-card>
</template>

<style scoped>
</style>
