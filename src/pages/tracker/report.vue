<script lang="ts" setup>
import axios from '@/lib/axios.ts';
import {formatISO, subMonths, subYears} from 'date-fns';
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from 'chart.js';
import {Bar} from 'vue-chartjs';
import type {APIResponse, TrackerReport} from '@/types';
import type {AxiosResponse} from "axios";
import {useTheme} from 'vuetify/framework';


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Choix de la période
const periodOptions = [
  {label: '3 derniers mois', value: '3m'},
  {label: '6 derniers mois', value: '6m'},
  {label: '1 an', value: '1y'},
  {label: '2 ans', value: '2y'},
  {label: '5 ans', value: '5y'},
];
const selectedPeriod = ref('6m');

const loading = ref(true);
const error = ref('');
const reportData: Ref<TrackerReport> = ref({});
const theme = useTheme()
const isDarkMode = computed(() => theme.global.name.value === 'dark');

const getPeriodRange = () => {
  const now = new Date();
  switch (selectedPeriod.value) {
    case '3m':
      return {start: subMonths(now, 3), end: now};
    case '6m':
      return {start: subMonths(now, 6), end: now};
    case '1y':
      return {start: subYears(now, 1), end: now};
    case '2y':
      return {start: subYears(now, 2), end: now};
    case '5y':
      return {start: subYears(now, 5), end: now};
    default:
      return {start: subMonths(now, 6), end: now};
  }
};

const fetchData = async () => {
  loading.value = true;
  error.value = '';
  const {start, end} = getPeriodRange();
  const startStr = formatISO(start, {representation: 'date'});
  const endStr = formatISO(end, {representation: 'date'});

  try {
    const res: AxiosResponse<APIResponse<TrackerReport>> = await axios.get(
      `/trackers/report?start=${startStr}&end=${endStr}`
    );
    if (res.status === 200 && res.data.data) {
      reportData.value = res.data.data;
    } else {
      error.value = 'Erreur lors du chargement des statistiques.';
    }
  } catch (err) {
    error.value = 'Impossible de récupérer les statistiques.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
watch(selectedPeriod, fetchData);

// Préparation du graphique
const chartData = computed(() => {
  const labels = Object.keys(reportData.value);
  const emotionSet = new Set<string>();

  // Parcours des mois et des émotions pour générer un ensemble d'émotions
  labels.forEach((month) => {
    if (!reportData.value[month]) return;
    const emotions = Object.keys(reportData.value[month]);
    emotions.forEach(e => emotionSet.add(e.trim()));
  });

  const emotions = Array.from(emotionSet);
  const datasets = emotions.map((emotion) => ({
    label: emotion,
    data: labels.map(month => {
      if (!reportData.value[month]) return 0;
      console.log(`reportData.value[${month}]?.[${emotion}]:`, reportData.value[month]);
      // Si aucune donnée n'est présente pour une émotion à un mois donné, retourner 0
      return reportData.value[month]?.[emotion] || 0;
    }),
    backgroundColor: getRandomColor(),
  }));

  return {
    labels,
    datasets
  };
});

function getRandomColor() {
  const r = () => Math.floor(Math.random() * 256);
  return `rgba(${r()}, ${r()}, ${r()}, 0.6)`;
}

const chartOptions = computed(() => ({
  responsive: true,
  plugins: {
    legend: {position: 'top' as const},
    title: {display: true, text: 'Émotions par période'},
  },
  scales: {
    x: {
      title: {display: true, text: 'Mois'},
    },
    y: {
      title: {display: true, text: 'Occurrences'},
      beginAtZero: true,
    },
  },
  backgroundColor: isDarkMode.value ? '#333' : '#fff',
  borderColor: isDarkMode.value ? '#fff' : '#333',
}));
</script>

<template>
  <v-container>
    <h1 class="text-h4 mb-4">
      Statistiques d’émotions
    </h1>
    <v-select
      v-model="selectedPeriod"
      :items="periodOptions"
      class="mb-4"
      item-title="label"
      item-value="value"
      label="Période"
    />

    <v-alert
      v-if="error"
      type="error"
    >
      {{ error }}
    </v-alert>
    <v-progress-linear
      v-if="loading"
      color="primary"
      indeterminate
    />

    <Bar
      v-if="!loading && !error && Object.keys(reportData).length > 0"
      :data="chartData"
      :options="chartOptions"
      class="mt-6"
    />
  </v-container>
</template>
