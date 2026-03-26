import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

function WeeklyIncomeCharts({ weeklyIncome }) {
  const chartData = Array.isArray(weeklyIncome) ? weeklyIncome : [];

  console.log("weeklyIncome prop:", weeklyIncome);
  console.log("chartData:", chartData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="totalPay" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default WeeklyIncomeCharts