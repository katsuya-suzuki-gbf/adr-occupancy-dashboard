import { useState } from 'react';
import './App.css';
import AdrOccupancyChart from './components/AdrOccupancyChart';
import { generateMockData, type DataPattern, PATTERN_LABELS, PATTERN_ANALYSIS } from './mockData';

function App() {
  // 現在選択されているデータパターンを管理するState
  const [pattern, setPattern] = useState<DataPattern>('correlation');

  // Stateに基づいてチャートデータを生成
  const chartData = generateMockData(pattern);
  const currentAnalysis = PATTERN_ANALYSIS[pattern];

  return (
    <div className="App">
      <header className="app-header">
        <h1>ADR・稼働率 相関分析ダッシュボード</h1>
        <p>
          価格設定（ADR）が稼働率にどう影響しているかを可視化し、<br />
          収益最大化のための最適な価格戦略を導き出すのに役立ちます。
        </p>
      </header>

      <div className="pattern-selector">
        <h3>表示するデータパターンを選択</h3>
        <div className="button-group">
          {Object.keys(PATTERN_LABELS).map((key) => (
            <button
              key={key}
              // 型アサーションで key が DataPattern であることを伝える
              onClick={() => setPattern(key as DataPattern)}
              // 現在選択中のボタンのスタイルを変更
              className={pattern === key ? 'active' : ''}
            >
              {PATTERN_LABELS[key as DataPattern]}
            </button>
          ))}
        </div>
      </div>

      <main className="chart-container">
        <AdrOccupancyChart data={chartData} />
      </main>

      <div className="analysis-container">
        <h2>分析結果と対策案</h2>
        <div className="analysis-content">
          <h3>📈 分析結果</h3>
          <p>{currentAnalysis.analysis}</p>
          <h3>💡 対策案</h3>
          <p>{currentAnalysis.recommendation}</p>
        </div>
      </div>

      <footer className="app-footer">
        <p><strong>右肩下がりの傾向:</strong> 価格を上げすぎると稼働率が低下する可能性を示唆しています。</p>
        <p><strong>右上に集中:</strong> 市場の需要が強く、さらなる値上げの余地があるかもしれません。</p>
      </footer>
    </div>
  );
}

export default App;