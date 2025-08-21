import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, Label
} from 'recharts';
import type { RevenueBreakdown } from '../types';

interface AncillaryRevenueProps {
  data: RevenueBreakdown[];
}

const AncillaryRevenue: React.FC<AncillaryRevenueProps> = ({ data }) => {
  // ツールチップのフォーマット
  const formatTooltip = (value: number, name: string) => {
    return [`${value.toLocaleString()}円`, name];
  };
  
  // Y軸のフォーマット
  const formatYAxis = (tick: number) => {
    return `${(tick / 1000000).toLocaleString()}M`; // M = Million (百万円)
  }

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month">
            <Label value="月" offset={-25} position="insideBottom" />
          </XAxis>
          <YAxis tickFormatter={formatYAxis}>
            <Label value="売上 (百万円)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} offset={-20} />
          </YAxis>
          <Tooltip formatter={formatTooltip} />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="accommodation" stackId="a" fill="#8884d8" name="宿泊" />
          <Bar dataKey="foodAndBeverage" stackId="a" fill="#82ca9d" name="料飲" />
          <Bar dataKey="souvenir" stackId="a" fill="#ffc658" name="物販" />
          <Bar dataKey="spaAndWellness" stackId="a" fill="#ff8042" name="ウェルネス" />
          <Bar dataKey="other" stackId="a" fill="#d3d3d3" name="その他" />
        </BarChart>
      </ResponsiveContainer>

      <div className="table-container">
        <h3>売上詳細データ</h3>
        <table className="revenue-table">
          <thead>
            <tr>
              <th>月</th>
              <th>宿泊者数</th>
              <th>宿泊売上</th>
              <th>付帯売上合計</th>
              <th>総売上</th>
              <th>顧客単価 (ARPU)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const ancillaryTotal = item.foodAndBeverage + item.souvenir + item.spaAndWellness + item.other;
              const totalRevenue = item.accommodation + ancillaryTotal;
              const arpu = totalRevenue / item.guests;
              return (
                <tr key={item.month}>
                  <td>{item.month}</td>
                  <td>{item.guests.toLocaleString()}人</td>
                  <td>{item.accommodation.toLocaleString()}円</td>
                  <td>{ancillaryTotal.toLocaleString()}円</td>

                  <td><strong>{totalRevenue.toLocaleString()}円</strong></td>
                  <td><strong>{Math.round(arpu).toLocaleString()}円</strong></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AncillaryRevenue;