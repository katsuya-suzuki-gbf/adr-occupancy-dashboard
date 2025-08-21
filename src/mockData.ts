import type { DataPoint } from './types';

// 生成するデータパターンの種類を定義
export type DataPattern = 'correlation' | 'high_demand' | 'price_sensitive' | 'no_correlation';

// 凡例として使うためのラベルを定義
export const PATTERN_LABELS: Record<DataPattern, string> = {
  correlation: 'パターン1: 綺麗な右肩下がり',
  high_demand: 'パターン2: 高需要・強気設定',
  price_sensitive: 'パターン3: 価格に敏感',
  no_correlation: 'パターン4: 相関なし',
};

// 特定のパターンのデータを生成するメイン関数
export const generateMockData = (pattern: DataPattern): DataPoint[] => {
  switch (pattern) {
    case 'correlation':
      return generateCorrelationData();
    case 'high_demand':
      return generateHighDemandData();
    case 'price_sensitive':
      return generatePriceSensitiveData();
    case 'no_correlation':
      return generateNoCorrelationData();
    default:
      return generateCorrelationData();
  }
};

// --- 以下、各パターンのデータ生成ロジック ---

/**
 * パターン1: 綺麗な右肩下がり（基本パターン）
 * 特徴: 価格を上げると、稼働率が素直に下がる。価格戦略の基本を理解するのに最適。
 * 分析: ADRと稼働率のトレードオフの関係が明確。RevPARが最大になるスイートスポットを探しやすい。
 */
const generateCorrelationData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < 50; i++) {
    const adr = 12000 + Math.random() * 23000; // 12,000円 ~ 35,000円
    const adrFactor = (35000 - adr) / 23000; // 0 (高価格) to 1 (低価格)
    let occupancy = 45 + (adrFactor * 50) + (Math.random() - 0.5) * 15;
    occupancy = Math.max(40, Math.min(98, occupancy));
    data.push({ date: `2025-07-${i + 1}`, adr, occupancy: parseFloat(occupancy.toFixed(1)) });
  }
  return data;
};

/**
 * パターン2: 高需要・右上に集中
 * 特徴: 全体的に稼働率が高く、価格を上げても稼働率が落ちにくい。点がグラフの右上に集まる。
 * 分析: 観光シーズンやイベント時など、市場の需要が非常に強い状態を示唆。さらなる値上げの余地があるかもしれない。
 */
const generateHighDemandData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < 50; i++) {
    const adr = 25000 + Math.random() * 15000; // 25,000円 ~ 40,000円 (高価格帯)
    let occupancy = 80 + Math.random() * 18; // 80% ~ 98% (高稼働)
    // 少しだけ価格の影響を受ける
    if (adr > 35000) {
      occupancy -= Math.random() * 5;
    }
    occupancy = Math.max(75, Math.min(99, occupancy));
    data.push({ date: `2025-08-${i + 1}`, adr, occupancy: parseFloat(occupancy.toFixed(1)) });
  }
  return data;
};

/**
 * パターン3: 価格に敏感・L字型
 * 特徴: ある一定の価格帯を超えると、稼働率が急激に低下する。グラフがL字のような形になる。
 * 分析: 顧客層が価格に非常に敏感であることを示す。この「崖」となる価格を見極めることが重要。
 */
const generatePriceSensitiveData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < 50; i++) {
    const adr = 12000 + Math.random() * 28000; // 12,000円 ~ 40,000円
    let occupancy = 85 + (Math.random() - 0.5) * 10;
    // 25,000円の壁
    if (adr > 25000) {
      // 価格が25000円を超えた分だけ急激に下がる
      occupancy -= (adr - 25000) / 150;
    }
    occupancy = Math.max(40, Math.min(95, occupancy));
    data.push({ date: `2025-09-${i + 1}`, adr, occupancy: parseFloat(occupancy.toFixed(1)) });
  }
  return data;
};

/**
 * パターン4: 相関なし・バラバラ
 * 特徴: 価格と稼働率に明確な関係が見られない。点が全体に散らばる。
 * 分析: 価格以外の要因（天候、競合の動き、イベント、口コミなど）が稼働率に強く影響している可能性を示唆。
 * 価格戦略だけでなく、他のマーケティング施策も重要になる。
 */
const generateNoCorrelationData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  for (let i = 0; i < 50; i++) {
    const adr = 12000 + Math.random() * 28000; // 12,000円 ~ 40,000円
    const occupancy = 50 + Math.random() * 48; // 50% ~ 98% (完全にランダム)
    data.push({ date: `2025-10-${i + 1}`, adr, occupancy: parseFloat(occupancy.toFixed(1)) });
  }
  return data;
};

// 各パターンの分析・対策テキストを定義
export const PATTERN_ANALYSIS: Record<DataPattern, { analysis: string; recommendation: string }> = {
  correlation: {
    analysis: '価格（ADR）を上げると稼働率が順当に下がる、典型的な負の相関関係が見られます。これは、価格設定が稼働率に直接的な影響を与えていることを示しています。',
    recommendation: 'ADRと稼働率のバランスが最も重要です。売上（RevPAR）が最大化する「スイートスポット」となる価格帯を見極めましょう。闇雲な値下げは、稼働率は上がっても総売上を下げる可能性があるため注意が必要です。',
  },
  high_demand: {
    analysis: '高価格帯（高ADR）でも高い稼働率を維持できています。これは、市場の需要が非常に強いか、ホテルのブランド力や提供価値が顧客に認められていることを示唆しています。',
    recommendation: '強気な価格設定が可能です。さらなるADRの上昇余地があると考えられます。週末やイベント日など、特定の日に段階的な価格テストを行い、稼働率が落ちない上限を探ってみましょう。',
  },
  price_sensitive: {
    analysis: 'ある価格帯を境に、稼働率が急激に落ち込む「価格の崖」が存在します。この価格帯の顧客層は、コストパフォーマンスを重視しており、価格に非常に敏感です。',
    recommendation: '稼働率が急落する価格の「しきい値」を正確に把握することが最優先です。そのしきい値を超えない範囲で、最も高い価格を設定する戦略が有効です。付加価値の低いプランで安易にこの価格帯を超えるべきではありません。',
  },
  no_correlation: {
    analysis: '価格（ADR）と稼働率の間に、明確な相関関係が見られません。これは、価格以外の要因（地域のイベント、天候、競合の動向、口コミ評価など）が稼働率を左右している可能性が高いことを示します。',
    recommendation: '価格戦略だけに頼るのではなく、多角的なアプローチが必要です。日々のイベント情報を収集・分析し、需要を予測しましょう。また、オンラインでの評判管理（MEO/VEO対策）や、ターゲット顧客に合わせたマーケティング施策を強化することが重要です。',
  },
};