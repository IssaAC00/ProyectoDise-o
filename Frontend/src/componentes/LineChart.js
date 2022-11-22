import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [6, 5, 5, 5, 3, 4, 6, 4, 5];
const scores2 = [1, 3, 2, 2, 4, 4, 5, 3, 2];
const labels = [300, 200, 300, 400, 500, 600, 700];

const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
  plugins: {
    legend: {
      display: true,
    },
  },
};

export default function LineChart() {
  const data = useMemo(function () {
    return {
      datasets: [
        {
          label: "Mis datos",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Mis datos (2)",
          tension: 0.3,
          data: scores2,
          borderColor: "black",
          backgroundColor: "rgba(127, 255, 0)",
          pointRadius: 6,
        },
        {
          label: "Mis datos (3)",
          tension: 0.3,
          data: scores2,
          borderColor: "chocolate",
          backgroundColor: "rgba(210, 105, 30)",
          pointRadius: 6,
        },
        {
          label: "Mis datos (4)",
          tension: 0.3,
          data: scores2,
          borderColor: "darkgray",
          backgroundColor: "rgba(169, 169, 169)",
          pointRadius: 6,
        },
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
}
