<script lang="ts" setup>

import {onMounted} from "vue";
import type {APIResponse, RouteParams, Tracker} from "@/types";
import type {AxiosResponse} from "axios";
import axios from "@/lib/axios.ts";
import {useTrackerStore} from "@/stores/tracker.ts";

const store = useTrackerStore()
const router = useRouter()
const route = useRoute()

const tracker: Ref<Tracker | null> = ref(null)

onMounted(async () => {
  const {id} = route.params as RouteParams
  const trackerId = Number(id)

  try {
    tracker.value = store.getTrackerById(trackerId) || null;
    if (!tracker.value) {
      const res: AxiosResponse<APIResponse<Tracker>> = await axios.get(`trackers/${trackerId}`)
      if (res.status === 200 && res.data.data) {
        store.updateTracker(res.data.data)
        tracker.value = res.data.data
      } else {
        console.error("Erreur lors de la récupération de l'utilisateur")
      }
    }
  } catch (err) {
    console.error(`Utilisateur avec l'ID ${id} introuvable`, err)
    router.back()
  }
})
</script>

<template>
  <div class="d-flex flex-column ga-5 align-center">
    <v-card
      v-if="!tracker"
      title="Chargement du tracker..."
    />
    <TrackerCard
      v-else
      :tracker="tracker"
      class="w-sm-100 w-md-66"
    >
      <template #content="{item}">
        <div v-html="item.description" />
      </template>
    </TrackerCard>
  </div>
</template>

<style lang="sass" scoped>

</style>
