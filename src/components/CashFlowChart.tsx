import React from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Label
} from 'recharts';
import type { CashFlowDataPoint } from '../types';

interface CashFlowChartProps {
  data: CashFlowDataPoint[];
}

const CashFlowChart: React.FC<CashFlowChartProps> = ({ data }) => {
  // Y軸のフォーマット（百万円単位）
  const formatYAxis = (tick: number) => `${(tick / 1000000).toLocaleString()}M`;

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ComposedChart data={data} margin={{ top: 20, right: 40, bottom: 40, left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date">
          <Label value="日付" offset={-25} position="insideBottom" />
        </XAxis>
        
        {/* 左Y軸: 収入・支出用 */}
        <YAxis yAxisId="left" tickFormatter={formatYAxis}>
          <Label value="収入・支出 (百万円)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} offset={-20} />
        </YAxis>

        {/* 右Y軸: 現金残高用 */}
        <YAxis yAxisId="right" orientation="right" tickFormatter={formatYAxis}>
           <Label value="現金残高 (百万円)" angle={-90} position="insideRight" style={{ textAnchor: 'middle' }} offset={-30} />
        </YAxis>

        <Tooltip formatter={(value: number) => `${value.toLocaleString()}円`} />
        <Legend verticalAlign="top" height={36} />
        
        {/* 棒グラフ */}
        <Bar yAxisId="left" dataKey="income" fill="#82ca9d" name="収入" />
        <Bar yAxisId="left" dataKey="expenses" fill="#ff8042" name="支出" />

        {/* 折れ線グラフ */}
        <Line yAxisId="right" type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={3} name="現金残高" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CashFlowChart;