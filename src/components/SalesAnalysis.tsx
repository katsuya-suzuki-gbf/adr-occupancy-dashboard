import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { RevenueShare } from '../types';

interface DonutChartProps {
  data: RevenueShare[];
  title: string;
}

// 汎用的なドーナツグラフコンポーネント
const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];
  
  // ラベルにパーセンテージを表示するためのカスタム関数
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="donut-chart-wrapper">
      <h4>{title}</h4>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value.toLocaleString()}円`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};


// SalesAnalysisコンポーネント本体
interface SalesAnalysisProps {
  channelData: RevenueShare[];
  planData: RevenueShare[];
}

const SalesAnalysis: React.FC<SalesAnalysisProps> = ({ channelData, planData }) => {
  return (
    <div className="sales-analysis-container">
      <DonutChart data={channelData} title="販売チャネル別 売上構成" />
      <DonutChart data={planData} title="プラン別 売上構成" />
    </div>
  );
};

export default SalesAnalysis;