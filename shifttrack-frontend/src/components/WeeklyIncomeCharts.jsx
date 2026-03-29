import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

function WeeklyIncomeCharts({ weeklyIncome }) {
  const chartData = Array.isArray(weeklyIncome)
    ? weeklyIncome.map((item) => ({
        ...item,
        totalPay: parseFloat(item.totalPay),
      }))
    : [];

  if (chartData.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
        <h3 className="text-lg font-semibold text-zinc-100">Weekly Income</h3>
        <p className="mt-6 text-center text-sm text-zinc-500">
          No data for the selected range. Try a wider date range.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-zinc-100">Weekly Income</h3>
        <p className="text-sm text-zinc-400">
          Gross pay grouped by week
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#27272a" strokeDasharray="4 4" />

          <XAxis
            dataKey="label"
            stroke="#a1a1aa"
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
          />

          <YAxis
            stroke="#a1a1aa"
            tick={{ fill: "#a1a1aa", fontSize: 12 }}
            axisLine={{ stroke: "#3f3f46" }}
            tickLine={false}
            tickFormatter={(value) => `$${value}`}
          />

          <Tooltip
            formatter={(value) => [`$${Number(value).toFixed(2)}`, "Gross Pay"]}
            contentStyle={{
              backgroundColor: "#09090b",
              border: "1px solid #27272a",
              borderRadius: "12px",
              color: "#f4f4f5",
            }}
          />

          <Line
            type="monotone"
            dataKey="totalPay"
            stroke="#f4f4f5"
            strokeWidth={2}
            dot={{ r: 5, fill: "#f4f4f5" }}
            activeDot={{ r: 7 }}
          >
            {/* 👇 Labels on top */}
            <LabelList
              dataKey="totalPay"
              position="top"
              formatter={(value) => `$${value}`}
              fill="#a1a1aa"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default WeeklyIncomeCharts;