import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import GlassCard from "../common/GlassCard";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const InvestorOverviewChart = ({
  summary,
}) => {
  const data = {
    labels: [
      "Current Principal",
      "Accumulated Interest",
      "Total Profit Earned",
      "Withdrawals",
    ],

    datasets: [
      {
        label: "My Portfolio",
        data: [
          summary?.totalInvestment || 0,
          summary?.accumulatedInterest || 0,
          summary?.totalProfitEarned || 0,
          summary?.totalWithdrawals || 0,
        ],

        backgroundColor: [
          "#7C6FFF",
          "#38BDF8",
          "#F59E0B",
          "#00D2B4",
        ],

        borderRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <GlassCard className="p-5 h-80">
      <h3 className="text-lg font-semibold mb-4">
        My Portfolio Overview
      </h3>

      <Bar
        data={data}
        options={options}
      />
    </GlassCard>
  );
};

export default InvestorOverviewChart;