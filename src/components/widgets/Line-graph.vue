<template>
  <div>
    <Line :data="chartData" :options="chartOptions" />
    <LegendComponent :legendValues="customLegendValues" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
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
    // Computed property to generate labels for the last 12 months
    const chartLabels = computed(() => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth(); // 0-based (0 = January, 11 = December)
      const currentYear = currentDate.getFullYear();

      // Generate labels for the last 12 months
      let labels = [];
      for (let i = 11; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        const month = date.toLocaleString("default", { month: "short" });
        const year = date.getFullYear();
        labels.push(`${month} ${year}`);
      }
      return labels;
    });

    const chartData = computed(() => ({
      labels: chartLabels.value,
      datasets: [
        {
          label: "Aantal gerenoveerde projecten",
          backgroundColor: "#0072FF",
          tension: 0.3,
          pointRadius: 0,
          borderColor: "#0072FF",
          data: props.data,
        },
      ],
    }));

    // Determine the minimum value for the y-axis dynamically
    const yAxisMin = computed(() => {
      const minDataValue = Math.min(...props.data);
      return minDataValue > 0 ? 1 : minDataValue;
    });

    const chartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
      interaction: {
        intersect: false,
      },
      scales: {
        y: {
          min: yAxisMin.value,
          ticks: {
            stepSize: 1, // Ensure a step size of 1 for detailed labeling
          },
        },
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
