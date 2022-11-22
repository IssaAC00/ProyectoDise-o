import { useEffect, useRef, useState } from "react";
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

const scores = [6, 5, 4, 10, 2];// Y
const labels = ['Por suceder', 'En ejecucion', 'Ejecutada', 'Ejecutada con Retraso ', 'Retrasada'];// X

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

export default function SegmentChartGrandient() {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  useEffect(function () {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    function createGradientColor(color) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.99, "rgba(255,255,255,0.6)");// el color base de los colores de la
      gradient.addColorStop(1, "rgba(255,255,255,0.6)");
      return gradient;
    }

    setChartData({
      datasets: [
        {
          label: "Grafico Inspecciones x Estado",
          data: scores,
          tension: 0.3,
          borderColor: "rgb(75, 192, 192)",
          pointRadius: 6,
          pointBackgroundColor: "rgb(75, 192, 192)",// color de las bolas
          backgroundColor: "rgba(75, 192, 192, 0.3)",// cuadro a la par del nombre
          segment: {
            borderColor: function (context) {
              if (context.type === "segment") {
                return context.p1DataIndex % 2 === 0 ? "red" : "black"; // linea de arriba
              }
            },
            backgroundColor: function (context) {
              if (context.type === "segment") {
                return createGradientColor(
                  context.p1DataIndex % 2 === 0 ? "red" : "black" // utiliza los colores definidos en LineChart // relleno
                );
              }
            },
          },
        },
      ],
      labels,
    });
  }, []);

  return <Line data={chartData} options={options} ref={chartRef} />;
}
