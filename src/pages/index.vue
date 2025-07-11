<script lang="ts" setup>
import {useTrackerStore} from "@/stores/tracker.ts";
import axios from "@/lib/axios.ts";
import type {AxiosResponse} from "axios";
import type {APIResponse, Tracker} from "@/types";
import {useUserStore} from "@/stores/user.ts";

const activity = [
  {
    title: 'Diagnostique',
    subtitle: 'Évaluez votre état de santé',
    icon: 'mdi-heart',
  },
  {
    title: 'Exercice de respiration',
    subtitle: 'Apprenez à respirer correctement',
    icon: 'mdi-weather-dust',
  },
  {
    title: 'Activités de détente',
    subtitle: 'Effectuez une activité de détente',
    icon: 'mdi-yoga',
  },
  {
    title: "Tracker d'émotion",
    subtitle: "Définissez votre humeur du jour",
    icon: 'mdi-emoticon-plus-outline',
    to: '/tracker/add'
  },
  {
    title: 'Information',
    subtitle: 'Consultez les informations du jour sur la santé',
    icon: 'mdi-information-box-outline',
    to: '/info'
  }
]

const store = useTrackerStore()
const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
  try {
    const res: AxiosResponse<APIResponse<Tracker[]>> = await axios.get('/trackers')

    if (res.status === 200 && res.data.data) {
      store.setTrackers(res.data.data)
    }
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.warn("Erreur 403 : accès refusé. Redirection...")
      userStore.logout()
      await router.push('/auth/login')
    } else {
      console.error("Erreur lors de la récupération des trackers :", error.message)
    }
  }
})

const appVersion = import.meta.env.VITE_FRONT_VERSION
const apiUrl = import.meta.env.VITE_API_URL
const mode = import.meta.env.MODE
</script>


<template>
  <v-container>
    <div class="d-flex justify-center flex-column align-center ga-5">
      <h1>Bienvenue sur</h1>
      <v-img
        src="/cesizen_logo.png"
        width="200"
      />
      <h3 class="mt-5">
        Choisissez une activité
      </h3>
      <div class="d-flex justify-center ga-3 flex-wrap">
        <v-card
          v-for="item in activity"
          :key="item.title"
          :disabled="!item.to"
          :prepend-icon="item.icon"
          :subtitle="item.subtitle"
          :title="item.title"
          min-width="375"
        >
          <v-card-actions>
            <v-btn
              v-if="item.to"
              :to="item.to"
              class="ma-2"
              color="primary"
              variant="outlined"
            >
              Commencer
            </v-btn>
            <v-btn
              v-else
              class="ma-2"
              color="primary"
              variant="outlined"
            >
              En cours de développement
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <v-card
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
    </div>
  </v-container>
</template>

