import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Add one more color for "Other"
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"];

function formatPredictionData(predictions) {
  const top3 = predictions.slice(0, 3);
  const totalTop3 = top3.reduce((sum, item) => sum + item.Probability, 0);
  const other = 1 - totalTop3;

  const pieData = top3.map((item) => ({
    name: item.Disease,
    value: parseFloat((item.Probability * 100).toFixed(2)),
  }));

  if (other > 0) {
    pieData.push({
      name: "Other",
      value: parseFloat((other * 100).toFixed(2)),
    });
  }

  return pieData;
}

const DiseasePieChart = ({ data }) => {
  const chartData = formatPredictionData(data);

  return (
    <div className="h-[50vh]  w-full lg:h-[50vh] rounded-2xl p-4">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${(percent * 100).toFixed(1)}%)`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DiseasePieChart;
