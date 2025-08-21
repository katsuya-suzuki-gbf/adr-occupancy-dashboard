import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Label
} from 'recharts';
// import type { TooltipProps } from 'recharts';
// import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import type { RoomTypePerformance } from '../types'; // types.tsにも追加が必要です

// ツールチップが受け取るpayload配列の中身の型を定義
interface TooltipPayloadItem {
  payload: RoomTypePerformance;
  // Rechartsは他にも多くのプロパティを渡しますが、必要なものだけ定義します
}

// カスタムツールチップが受け取るProps全体の型を独自に定義
interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
}

// Tooltipに表示する内容をカスタム
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as RoomTypePerformance;
    return (
      <div className="custom-tooltip">
        <p className="tooltip-label" style={{fontWeight: 'bold'}}>{data.roomType}</p>
        <p>{`稼働率: ${data.occupancy.toFixed(1)}%`}</p>
        <p>{`ADR: ${data.adr.toLocaleString()}円`}</p>
        <p>{`総売上: ${(data.totalRevenue / 10000).toLocaleString()}万円`}</p>
      </div>
    );
  }
  return null;
};

interface RoomTypeChartProps {
  data: RoomTypePerformance[];
}

const RoomTypeChart: React.FC<RoomTypeChartProps> = ({ data }) => {
  // バブルサイズを決めるための売上の範囲を計算
  const revenueDomain = [
    Math.min(...data.map(d => d.totalRevenue)),
    Math.max(...data.map(d => d.totalRevenue)),
  ];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />

        {/* X軸: 稼働率 */}
        <XAxis
          type="number"
          dataKey="occupancy"
          name="稼働率"
          unit="%"
          domain={[60, 100]}
        >
          <Label value="客室稼働率 (%)" offset={-25} position="insideBottom" />
        </XAxis>

        {/* Y軸: ADR */}
        <YAxis
          type="number"
          dataKey="adr"
          name="ADR"
          unit="円"
          tickFormatter={(tick) => `${(tick / 1000).toLocaleString()}k`}
          domain={['dataMin - 5000', 'dataMax + 5000']}
        >
          <Label value="平均客室単価 (ADR)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} offset={-10} />
        </YAxis>

        {/* Z軸: バブルサイズ (総売上) */}
        <ZAxis 
          type="number" 
          dataKey="totalRevenue" 
          domain={revenueDomain}
          range={[100, 1500]} // バブルの最小・最大サイズ
          name="総売上"
        />

        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Legend verticalAlign="top" height={36}/>

        {/* 各客室タイプをバブルとして描画 */}
        <Scatter name="客室タイプ別" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default RoomTypeChart;