import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Label
} from 'recharts';
import type { LeadTimeBin } from '../types';

interface LeadTimeChartProps {
  data: LeadTimeBin[];
}

const LeadTimeChart: React.FC<LeadTimeChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data} margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name">
          <Label value="予約リードタイム（宿泊日からの日数）" offset={-25} position="insideBottom" />
        </XAxis>
        <YAxis>
          <Label value="予約件数" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} offset={-20} />
        </YAxis>
        <Tooltip formatter={(value: number) => [`${value}件`, '予約件数']} />
        <Legend verticalAlign="top" height={36} />
        <Bar dataKey="count" fill="#8884d8" name="予約件数" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default LeadTimeChart;