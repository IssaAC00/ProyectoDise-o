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

const scores = [6, 5, 5, 5, 3 ];
const labels = [300, 200, 300, 400, 500];

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
          segment: {
            borderColor: function (context) {
              if (context.type === "segment") {
                return context.p1DataIndex % 2 === 0 ? "red" : "black";
              }
            },
            backgroundColor: function (context) {
              if (context.type === "segment") {
                return context.p1DataIndex % 2 === 0 ? "red" : "black";
              }
            },
          },
        },
      ],
      labels,
    };
  }, []);

  return <Line data={data} options={options} />;
}
