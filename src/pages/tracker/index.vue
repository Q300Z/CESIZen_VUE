<script lang="ts" setup>
import {computed, onMounted, ref} from 'vue';
import {useTrackerStore} from "@/stores/tracker.ts";
import type {APIResponse, Tracker} from "@/types";
import type {AxiosResponse} from "axios";
import axios from "@/lib/axios.ts";
import {definePage} from "unplugin-vue-router/runtime";

definePage({
  meta: {
    requiresAuth: true,
  },
});

const store = useTrackerStore();
const trackers = computed(() => store.trackers);
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const res: AxiosResponse<APIResponse<Tracker[]>> = await axios.get("/trackers");
    if (res.status === 200 && res.data.data) {
      store.setTrackers(res.data.data);
    } else {
      throw new Error("Erreur lors de la récupération des trackers");
    }
  } catch (err) {
    console.error("Erreur lors de la récupération des trackers", err);
    error.value = "Impossible de charger les trackers.";
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <v-container>
    <v-data-iterator
      :items="trackers"
      :loading="loading"
      class="mt-4"
      items-per-page="6"
    >
      <template #header>
        <v-toolbar flat>
          <v-toolbar-title>Liste des trackers</v-toolbar-title>
          <v-spacer />
          <v-btn color="primary" to="/tracker/add">Ajouter un tracker</v-btn>
        </v-toolbar>
      </template>
      <template #default="{ items }">
        <v-row>
          <v-col
            v-for="tracker in items"
            :key="tracker.raw.id"
            cols="12"
            md="4"
            sm="6"
          >
            <TrackerCard :tracker="tracker.raw">
              <template #action="{item}">
                <v-btn :to="`/tracker/${item.id}`" color="primary">Lire la suite</v-btn>
              </template>
            </TrackerCard>

          </v-col>
        </v-row>
      </template>

      <template #no-data>
        <v-alert type="info">Aucun tracker trouvé.</v-alert>
      </template>

      <template #loader>
        <v-row>
          <v-col v-for="n in 6" :key="n" cols="12" md="4" sm="6">
            <v-skeleton-loader type="card"/>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<style lang="sass" scoped>
</style>
