<script lang="ts" setup>
import { definePage } from "unplugin-vue-router/runtime";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "@/lib/axios";
import type { Emotion, EmotionBase, RouteParams } from "@/types";
import { useEmotionStore } from "@/stores/emotion.ts";

definePage({
  meta: {
    requiresAuth: true,
    isAdmin: true,
  },
});

const route = useRoute();
const router = useRouter();
const store = useEmotionStore();

const emotion = ref<Partial<Emotion>>({});

const alert = ref("");
const alertType = ref<"success" | "error">("success");

const submit = async (formData: Partial<Emotion>) => {
  try {
      const res = await axios.put(`/emotions/${formData.id}`, formData);
      store.updateEmotion(res.data.data);
      alert.value = "Émotion mise à jour avec succès.";

    alertType.value = "success";
    setTimeout(() => {
      router.push(`/admin/emotions`);
    }, 1500);
  } catch (error) {
    console.error("Erreur :", error);
    alert.value = "Une erreur est survenue.";
    alertType.value = "error";
  }
};

onMounted(async () => {
  const { id } = route.params as RouteParams;
  if (id) {
    try {
      emotion.value = store.getEmotionById(Number(id))|| {};
      if (emotion.value) {
        const res = await axios.get(`/emotions/${id}`);
        emotion.value = res.data.data;
        store.updateEmotion(res.data.data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement de l'émotion :", error);
      router.back();
    }
  }
});
</script>

<template>
  <div>
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

    <v-card v-if="!emotion" title="Chargement de l'émotion..."></v-card>
    <EmotionForm
      v-else
      :model-value="emotion"
      @submit="submit"
    />
  </div>
</template>
