import { useState } from 'react';
import './App.css';
import AdrOccupancyChart from './components/AdrOccupancyChart';
import RoomTypeChart from './components/RoomTypeChart';
import AncillaryRevenue from './components/AncillaryRevenue'; // 新しいコンポーネントをインポート
import CashFlowChart from './components/CashFlowChart';
import LeadTimeChart from './components/LeadTimeChart';
import SalesAnalysis from './components/SalesAnalysis';

import { 
  generateDailyMockData,
  generateRoomTypeData,
  generateRevenueBreakdownData,
  generateCashFlowData,
  generateLeadTimeData,
  generateChannelRevenueData, // 新しいデータ生成関数をインポート
  generatePlanRevenueData,    // 新しいデータ生成関数をインポート
  DAILY_PATTERN_LABELS,
  ROOM_TYPE_PATTERN_LABELS,
  DAILY_PATTERN_ANALYSIS,
  ROOM_TYPE_PATTERN_ANALYSIS
} from './mockData';
import type { DailyDataPattern, RoomTypeDataPattern } from './mockData';

type ViewType = 'daily' | 'roomType' | 'ancillary' | 'cashflow' | 'leadTime' | 'sales';

function App() {
  const [view, setView] = useState<ViewType>('daily');
  const [dailyPattern, setDailyPattern] = useState<DailyDataPattern>('correlation');
  const [roomTypePattern, setRoomTypePattern] = useState<RoomTypeDataPattern>('balanced');

  const dailyChartData = generateDailyMockData(dailyPattern);
  const roomTypeChartData = generateRoomTypeData(roomTypePattern);
  const ancillaryChartData = generateRevenueBreakdownData();
  const cashFlowChartData = generateCashFlowData();
  const leadTimeChartData = generateLeadTimeData();
  const channelRevenueData = generateChannelRevenueData();
  const planRevenueData = generatePlanRevenueData();

  const currentDailyAnalysis = DAILY_PATTERN_ANALYSIS[dailyPattern];
  const currentRoomTypeAnalysis = ROOM_TYPE_PATTERN_ANALYSIS[roomTypePattern];

    // ビューに応じたタイトルと説明を定義
  const viewDetails = {
    daily: { title: 'ADR・稼働率 相関分析', description: '価格設定が稼働率にどう影響しているかを可視化します。' },
    roomType: { title: '客室タイプ別 稼働率と収益性分析', description: 'どの客室タイプが最も効率的に収益を上げているかを分析します。' },
    ancillary: { title: '付帯施設・サービス 売上分析', description: '宿泊以外の売上源がどれだけホテル収益に貢献しているかを評価します。' },
    cashflow: { title: 'キャッシュフロー予測', description: '日々の収入・支出と現金残高の推移を予測し、短期的な資金繰りを可視化します。' },
    leadTime: { title: '予約リードタイム分析', description: '顧客が宿泊日のどれくらい前に予約しているかの分布を可視化します。' },
    sales: { title: '販売チャネル別・プラン別 売上構成', description: 'どの販売チャネルや宿泊プランが売上に貢献しているかの割合を分析します。' }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>ホテル収益分析ダッシュボード</h1>
        <h2>{viewDetails[view].title}</h2>
      </header>

      <div className="view-selector">
        <button onClick={() => setView('daily')} className={view === 'daily' ? 'active' : ''}>日別分析</button>
        <button onClick={() => setView('roomType')} className={view === 'roomType' ? 'active' : ''}>客室タイプ別分析</button>
        <button onClick={() => setView('ancillary')} className={view === 'ancillary' ? 'active' : ''}>付帯施設</button>
        <button onClick={() => setView('cashflow')} className={view === 'cashflow' ? 'active' : ''}>キャッシュフロー</button>
        <button onClick={() => setView('leadTime')} className={view === 'leadTime' ? 'active' : ''}>リードタイム</button>
        <button onClick={() => setView('sales')} className={view === 'sales' ? 'active' : ''}>販売分析</button>
      </div>

      <div className="description-box">
        <p>{viewDetails[view].description}</p>
      </div>

      {view === 'daily' && (
        <>
          <div className="pattern-selector">
            <h3>表示するデータパターンを選択</h3>
            <div className="button-group">
              {(Object.keys(DAILY_PATTERN_LABELS) as DailyDataPattern[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setDailyPattern(key)}
                  className={dailyPattern === key ? 'active' : ''}
                >
                  {DAILY_PATTERN_LABELS[key]}
                </button>
              ))}
            </div>
          </div>
          <main className="chart-container">
            <AdrOccupancyChart data={dailyChartData} />
          </main>
          <div className="analysis-container">
            <h2>分析結果と対策案</h2>
            <div className="analysis-content">
              <h3>📈 分析結果</h3>
              <p>{currentDailyAnalysis.analysis}</p>
              <h3>💡 対策案</h3>
              <p>{currentDailyAnalysis.recommendation}</p>
            </div>
          </div>
        </>
      )}

      {view === 'roomType' && (
        <>
          <div className="pattern-selector">
            <h3>表示するデータパターンを選択</h3>
            <div className="button-group">
              {(Object.keys(ROOM_TYPE_PATTERN_LABELS) as RoomTypeDataPattern[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setRoomTypePattern(key)}
                  className={roomTypePattern === key ? 'active' : ''}
                >
                  {ROOM_TYPE_PATTERN_LABELS[key]}
                </button>
              ))}
            </div>
          </div>
          <main className="chart-container">
            <RoomTypeChart data={roomTypeChartData} />
          </main>
          <div className="analysis-container">
            <h2>分析結果と対策案</h2>
            <div className="analysis-content">
              <h3>📈 分析結果</h3>
              <p>{currentRoomTypeAnalysis.analysis}</p>
              <h3>💡 対策案</h3>
              <p>{currentRoomTypeAnalysis.recommendation}</p>
            </div>
          </div>
        </>
      )}

      {view === 'ancillary' && (
        <>
          <main className="chart-container">
            <AncillaryRevenue data={ancillaryChartData} />
          </main>
          <div className="analysis-container">
            <h2>分析結果と対策案</h2>
            <div className="analysis-content">
              <h3>📈 分析結果</h3>
              <p>積み上げ棒グラフは、総売上に占める宿泊売上と付帯売上の構成比率を示しています。詳細テーブルでは、顧客一人当たりの単価（ARPU）を算出しており、付帯施設の利用促進がARPU向上に直結していることが分かります。</p>
              <h3>💡 対策案</h3>
              <p>付帯売上の比率が低い月は、季節に合わせたレストランの特別メニューや、スパの割引キャンペーンなどを企画する好機です。ARPUの推移を追うことで、これらの施策が顧客単価の向上に繋がったかを効果測定できます。</p>
            </div>
          </div>
        </>
      )}

      {view === 'cashflow' && (
        <>
          <main className="chart-container">
            <CashFlowChart data={cashFlowChartData} />
          </main>
          <div className="analysis-container">
            <h2>分析結果と対策案</h2>
            <div className="analysis-content">
              <h3>📈 分析結果</h3>
              <p>給与支払日（25日）や仕入れ費支払い（10日）など、特定の日に支出が急増し、現金残高が大きく減少しているのが分かります。日々の収入があっても、支払いのタイミングによっては残高が危険水準に近づくリスクを示唆しています。</p>
              <h3>💡 対策案</h3>
              <p>現金残高が最も少なくなる日を常に把握し、そのタイミングで資金不足に陥らないよう備えることが重要です。大きな支払い日が近い場合は、広告宣伝費の支払いを翌月にずらす、または短期の融資を検討するなど、事前の資金繰り対策を講じることができます。</p>
            </div>
          </div>
        </>
      )}

      {view === 'leadTime' && (
        <>
          <main className="chart-container">
            <LeadTimeChart data={leadTimeChartData} />
          </main>
          <div className="analysis-container">
            <h2>分析結果と対策案</h2>
            <div className="analysis-content">
              <h3>📈 分析結果</h3>
              <p>ヒストグラムは、どのタイミングで予約が集中しているかを示しています。この例では「0-7日」の直前予約と、「31-90日」の中期的な予約に2つの山があり、これが当ホテルの顧客の主な予約パターンであることが分かります。</p>
              <h3>💡 対策案</h3>
              <p>予約が集中する期間に合わせた料金戦略が有効です。例えば、予約の少ない「15-30日」前の期間を埋めるために、期間限定のタイムセールや特典付きプランを提供します。また、「91日以上」前の早期予約をさらに促進するために、より魅力的な早割プラン（例: 返金不可で大幅割引）を造成するなどの施策が考えられます。</p>
            </div>
          </div>
        </>
      )}
      
      {view === 'sales' && (
        <>
          <main className="chart-container">
            <SalesAnalysis channelData={channelRevenueData} planData={planRevenueData} />
          </main>
          <div className="analysis-container">
            <h2>分析結果と対策案</h2>
            <div className="analysis-content">
              <h3>📈 分析結果</h3>
              <p>左のグラフは販売チャネルごとの売上構成比、右のグラフはプランごとの売上構成比を示しています。この例では「自社サイト」が最も大きな売上を上げており、プランでは「早割」と「通常料金」が主力であることが分かります。</p>
              <h3>💡 対策案</h3>
              <p>利益率の高い「自社サイト」からの予約比率をさらに高めるための施策（例: 最安値保証、会員限定特典）が有効です。また、売上貢献度の高いプランを分析し、その要素（価格、特典など）を他のプランに応用したり、OTAなど他のチャネルで重点的に販売するなどの戦略が考えられます。</p>
            </div>
          </div>
        </>
      )}

      <footer className="app-footer">
        <p>このダッシュボードはデモデータに基づいています。</p>
      </footer>
    </div>
  );
}

export default App;