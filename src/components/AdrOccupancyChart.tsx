import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Label
} from 'recharts';
// DataPointの型のみインポートします
import type { DataPoint } from '../types';

// ----- ここからが新しい部分です -----

// ツールチップが受け取るpayload配列の中身の型を定義
interface TooltipPayloadItem {
  payload: DataPoint;
  // Rechartsは他にも多くのプロパティを渡しますが、必要なものだけ定義します
}

// カスタムツールチップが受け取るProps全体の型を独自に定義
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

// ----- ここまで -----

// 独自の型 `CustomTooltipProps` を使用します
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    // 既に型が正確なので `as DataPoint` は不要になります
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label">{`日付: ${data.date}`}</p>
        <p className="tooltip-adr">{`ADR: ${data.adr.toLocaleString()}円`}</p>
        <p className="tooltip-occupancy">{`稼働率: ${data.occupancy}%`}</p>
      </div>
    );
  }
  return null;
};

// --- 以下、AdrOccupancyChartコンポーネント（変更なし） ---
interface AdrOccupancyChartProps {
  data: DataPoint[];
}

const AdrOccupancyChart: React.FC<AdrOccupancyChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart
        margin={{ top: 20, right: 30, bottom: 40, left: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          type="number"
          dataKey="adr"
          name="ADR"
          unit="円"
          domain={['dataMin - 2000', 'dataMax + 2000']}
          tickFormatter={(tick) => tick.toLocaleString()}
        >
          <Label value="平均客室単価 (ADR)" offset={-25} position="insideBottom" />
        </XAxis>

        <YAxis
          type="number"
          dataKey="occupancy"
          name="稼働率"
          unit="%"
          domain={[0, 100]}
        >
          <Label value="客室稼働率 (%)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} offset={-10} />
        </YAxis>

        {/* ここで渡されるコンポーネントは内部的に active と payload を受け取ります */}
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Legend verticalAlign="top" height={36} />
        <Scatter name="日別実績" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default AdrOccupancyChart;