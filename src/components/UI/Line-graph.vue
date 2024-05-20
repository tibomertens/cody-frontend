<template>
    <div>
      <Line :data="chartData" :options="chartOptions" />
      <LegendComponent :legendValues="customLegendValues" />
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from 'vue';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Line } from "vue-chartjs";
  import LegendComponent from "../UI/Legend-graph.vue";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export default defineComponent({
    name: "Graph",
    components: {
      Line,
      LegendComponent,
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const chartData = computed(() => ({
        labels: [
          "Januari", "Februari", "Maart", "April", "Mei", "Juni", 
          "Juli", "Augustus", "September", "Oktober", "November", "December"
        ],
        datasets: [
          {
            label: "Aantal renoveerprojecten",
            backgroundColor: "#0072FF",
            tension: 0.3,
            pointRadius: 0,
            borderColor: "#0072FF",
            data: props.data,
          },
        ],
      }));
  
      const chartOptions = {
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
        },
      };
  
      const customLegendValues = computed(() => 
        chartData.value.datasets.map((dataset) => ({
          label: dataset.label,
          color: dataset.backgroundColor,
        }))
      );
  
      return {
        chartData,
        chartOptions,
        customLegendValues,
      };
    },
  });
  </script>
  