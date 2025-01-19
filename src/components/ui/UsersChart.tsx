import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';
import SummaryCard from '@/components/ui/SummaryCard.tsx';
import { User } from '@/types/user';

interface UsersChartProps {
  user: User;
}

const UsersChart: React.FC<UsersChartProps> = ({ user }: UsersChartProps) => {
  // Prepare data for the chart
  const chartData = user.profit.map((profit, index) => ({
    name: index + 1,
    profit,
    loss: Math.abs(user.loss[index]),
  }));

  // Set values for the chart
  const totalProfit = user.totalProfit ?? 0;
  const totalLoss = user.totalLoss ?? 0;
  const balance = user.balance ?? 0;

  return (
    <div className="bg-secondary rounded-lg py-3 px-0">
      {/* Chart */}
      <div className="flex">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis
                tick={{ fill: '#94a3b8', fontSize: 12 }}
                tickFormatter={(value) => `${value / 1000}K`} // Format to "K"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: 'none',
                  borderRadius: '5px',
                  color: '#fff',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{
                  paddingTop: '10px',
                  color: '#94a3b8',
                  fontSize: '12px',
                }}
              />
              <Line
                type="linear"
                dataKey="profit"
                name="Profit" // Legend label
                stroke="#0FC2C0"
                strokeWidth={2}
                dot={{ r: 5, fill: '#0FC2C0' }}
              />
              <Line
                type="linear"
                dataKey="loss"
                name="Loss" // Legend label
                stroke="#FF3737"
                strokeWidth={2}
                dot={{ r: 5, fill: '#FF3737' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Summary */}
        <div className="ml-4 flex flex-col justify-center w-[220px]">
          <SummaryCard
            title="Profit"
            value={totalProfit}
            valueClassName="text-positive"
          />
          <SummaryCard
            title="Loss"
            value={totalLoss}
            valueClassName="text-negative"
          />
          <SummaryCard
            title="Balance"
            value={balance}
            valueClassName="text-textBalance"
          />
        </div>
      </div>
    </div>
  );
};

export default UsersChart;
