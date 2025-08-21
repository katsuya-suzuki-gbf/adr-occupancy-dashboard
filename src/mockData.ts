import type { DataPoint } from './types';
import type { RevenueShare } from './types';

// 生成するデータパターンの種類を定義
export type DataPattern = 'correlation' | 'high_demand' | 'price_sensitive' | 'no_correlation';

// 凡例として使うためのラベルを定義
export const PATTERN_LABELS: Record<DataPattern, string> = {
  correlation: 'パターン1: 綺麗な右肩下がり',
  high_demand: 'パターン2: 高需要・強気設定',
  price_sensitive: 'パターン3: 価格に敏感',
  no_correlation: 'パターン4: 相関なし',
};
export type DailyDataPattern = 'correlation' | 'high_demand' | 'price_sensitive' | 'no_correlation';

export const DAILY_PATTERN_LABELS: Record<DailyDataPattern, string> = {
  correlation: 'パターン1: 綺麗な右肩下がり',
  high_demand: 'パターン2: 高需要・強気設定',
  price_sensitive: 'パターン3: 価格に敏感',
  no_correlation: 'パターン4: 相関なし',
};

// --- 客室タイプ別分析用 ---
export type RoomTypeDataPattern = 'balanced' | 'cash_cow' | 'suite_problem' | 'undifferentiated';

export const ROOM_TYPE_PATTERN_LABELS: Record<RoomTypeDataPattern, string> = {
  balanced: 'パターンA: バランス型',
  cash_cow: 'パターンB: 主力依存型',
  suite_problem: 'パターンC: スイート不振型',
  undifferentiated: 'パターンD: 商品未分化型',
};

// 特定のパターンのデータを生成するメイン関数
export const generateDailyMockData = (pattern: DataPattern): DataPoint[] => {
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

export const generateRoomTypeData = (pattern: RoomTypeDataPattern): RoomTypePerformance[] => {
  switch (pattern) {
    case 'balanced': return generateBalancedData();
    case 'cash_cow': return generateCashCowData();
    case 'suite_problem': return generateSuiteProblemData();
    case 'undifferentiated': return generateUndifferentiatedData();
    default: return generateBalancedData();
  }
};

// --- 客室タイプ別データ生成ロジック ---

/** パターンA: バランス型 (理想形) */
const generateBalancedData = (): RoomTypePerformance[] => ([
  { roomType: 'スイート', occupancy: 75.2, adr: 85000, totalRevenue: 127800000 },
  { roomType: '露天風呂付き客室', occupancy: 92.5, adr: 52000, totalRevenue: 384800000 },
  { roomType: 'デラックスツイン', occupancy: 88.1, adr: 38000, totalRevenue: 401320000 },
  { roomType: 'スタンダードダブル', occupancy: 95.8, adr: 21000, totalRevenue: 321496000 },
]);

/** パターンB: 主力依存型 */
const generateCashCowData = (): RoomTypePerformance[] => ([
  { roomType: 'スイート', occupancy: 65.1, adr: 78000, totalRevenue: 81200000 },
  { roomType: '露天風呂付き客室', occupancy: 94.8, adr: 55000, totalRevenue: 521400000 }, // 主力商品
  { roomType: 'デラックスツイン', occupancy: 82.3, adr: 35000, totalRevenue: 230440000 },
  { roomType: 'スタンダードダブル', occupancy: 85.0, adr: 19000, totalRevenue: 193800000 },
]);

/** パターンC: スイート不振型 */
const generateSuiteProblemData = (): RoomTypePerformance[] => ([
  { roomType: 'スイート', occupancy: 35.5, adr: 92000, totalRevenue: 45700000 }, // ADRは高いが稼働率が極端に低い
  { roomType: '露天風呂付き客室', occupancy: 91.0, adr: 48000, totalRevenue: 349440000 },
  { roomType: 'デラックスツイン', occupancy: 89.2, adr: 36000, totalRevenue: 385344000 },
  { roomType: 'スタンダードダブル', occupancy: 94.1, adr: 20000, totalRevenue: 301120000 },
]);

/** パターンD: 商品未分化型 */
const generateUndifferentiatedData = (): RoomTypePerformance[] => ([
  { roomType: 'スイート', occupancy: 82.1, adr: 38000, totalRevenue: 249656000 }, // 全てが中央に密集
  { roomType: '露天風呂付き客室', occupancy: 85.3, adr: 35000, totalRevenue: 238840000 },
  { roomType: 'デラックスツイン', occupancy: 88.4, adr: 32000, totalRevenue: 226304000 },
  { roomType: 'スタンダードダブル', occupancy: 90.2, adr: 29000, totalRevenue: 209268000 },
]);

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
export const DAILY_PATTERN_ANALYSIS: Record<DataPattern, { analysis: string; recommendation: string }> = {
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

// ...（これまでのコードはそのまま）...

// --- ここから追記 ---

// 客室タイプ別パフォーマンスの型を定義
export interface RoomTypePerformance {
  roomType: string;
  occupancy: number; // 稼働率 (%)
  adr: number;       // 平均客室単価 (円)
  totalRevenue: number; // 総売上 (円)
}


export const ROOM_TYPE_PATTERN_ANALYSIS: Record<RoomTypeDataPattern, { analysis: string; recommendation: string }> = {
  balanced: {
    analysis: '各客室タイプが、それぞれの価格帯で適切に稼働し、収益を上げています。高単価・高付加価値の客室と、高稼働率で安定収益を稼ぐ客室のバランスが取れた、理想的なポートフォリオです。',
    recommendation: 'この良好なバランスを維持することが目標です。季節変動や市場トレンドを注視し、各タイプの需要に応じた微調整を続けましょう。収益貢献度の高い「デラックス」や「露天風呂付き」の稼働率をさらに高める施策が次の打ち手です。'
  },
  cash_cow: {
    analysis: '「露天風呂付き客室」が圧倒的な稼働率・ADR・総売上を叩き出しており、ホテル全体の収益を牽引しています。しかし、裏を返せば、この客室タイプへの依存度が高すぎる危険な状態とも言えます。',
    recommendation: '主力商品への依存リスクを分散させる戦略が必要です。まず、他の客室タイプ、特に「デラックスツイン」の魅力を高める改装や、新たな宿泊プランの造成を検討しましょう。長期的に安定した収益構造を目指すべきです。'
  },
  suite_problem: {
    analysis: '「スイート」のADRは非常に高いものの、稼働率が極端に低く、結果として総売上への貢献度が最小になっています。高価格が原因で、顧客から敬遠されている可能性があります。',
    recommendation: '「スイート」の販売戦略の抜本的な見直しが必要です。記念日プランや富裕層向けパッケージなど、高価格に見合う付加価値を訴求するプランを造成しましょう。稼働率が改善しない場合、改装による客室タイプの変更も視野に入れるべきです。'
  },
  undifferentiated: {
    analysis: '全ての客室タイプが似通った稼働率とADRに集中しており、明確な差別化ができていません。顧客は部屋タイプの価格差や価値の違いを認識できず、結果として最も安い部屋に需要が流れている可能性があります。',
    recommendation: '客室タイプごとの「売り」を明確にし、価格戦略を再設計すべきです。各タイプのコンセプトを見直し、サービスやアメニティで差をつけましょう。その上で、価値の違いが価格に反映されるような、メリハリのある料金体系を構築することが急務です。'
  }
};

// ...（これまでのコードはそのまま）...

// --- ここから追記 ---

// 月次売上内訳の型を定義
export interface RevenueBreakdown {
  month: string;
  guests: number; // 宿泊者数
  accommodation: number; // 宿泊売上
  foodAndBeverage: number; // 料飲売上
  souvenir: number; // 物販売上
  spaAndWellness: number; // エステ・ウェルネス売上
  other: number; // その他売上
}

// 月次売上内訳のデモデータを生成する関数
export const generateRevenueBreakdownData = (): RevenueBreakdown[] => ([
  { month: '4月', guests: 3850, accommodation: 57750000, foodAndBeverage: 15400000, souvenir: 4620000, spaAndWellness: 2310000, other: 1155000 },
  { month: '5月', guests: 4210, accommodation: 67360000, foodAndBeverage: 18945000, souvenir: 5473000, spaAndWellness: 3368000, other: 1263000 },
  { month: '6月', guests: 3560, accommodation: 49840000, foodAndBeverage: 14240000, souvenir: 3916000, spaAndWellness: 1780000, other: 890000 },
  { month: '7月', guests: 4520, accommodation: 76840000, foodAndBeverage: 22600000, souvenir: 7232000, spaAndWellness: 4068000, other: 1808000 },
  { month: '8月', guests: 4850, accommodation: 92150000, foodAndBeverage: 29100000, souvenir: 9215000, spaAndWellness: 5335000, other: 2425000 },
  { month: '9月', guests: 4100, accommodation: 65600000, foodAndBeverage: 17620000, souvenir: 5248000, spaAndWellness: 3280000, other: 1230000 },
]);

// ...（これまでのコードはそのまま）...

// --- ここから追記 ---

// 日次キャッシュフローの型を定義
export interface CashFlowDataPoint {
  date: string;
  income: number;    // 日次収入
  expenses: number;  // 日次支出
  balance: number;   // 日末現金残高
}

// キャッシュフローのデモデータを生成する関数
export const generateCashFlowData = (): CashFlowDataPoint[] => {
  const data: CashFlowDataPoint[] = [];
  let currentBalance = 5000000; // 期首現金残高: 500万円
  const startDate = new Date('2025-09-01');

  for (let i = 0; i < 30; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const day = currentDate.getDate();

    // 基本的な収入・支出
    let income = 500000 + Math.random() * 800000; // 50万〜130万
    let expenses = 400000 + Math.random() * 300000; // 40万〜70万

    // 特定の日に大きな支出イベントを追加
    if (day === 10) expenses += 1500000; // 仕入れ費
    if (day === 25) expenses += 3000000; // 給与支払い
    if (day === 28) expenses += 800000;  // 家賃・光熱費

    currentBalance = currentBalance + income - expenses;

    data.push({
      date: `9/${day}`,
      income,
      expenses,
      balance: currentBalance,
    });
  }
  return data;
};

// ...（これまでのコードはそのまま）...

// --- ここから追記 ---

// リードタイム分布の型を定義
export interface LeadTimeBin {
  name: string;  // リードタイムの期間 (例: '0-7日')
  count: number; // その期間の予約件数
}

// リードタイムのデモデータを生成する関数
export const generateLeadTimeData = (): LeadTimeBin[] => {
  // 1000件の予約をシミュレーション
  const totalBookings = 1000;
  const leadTimes: number[] = [];

  for (let i = 0; i < totalBookings; i++) {
    const random = Math.random();
    let leadTime = 0;
    // 現実的な分布になるようにランダム値を調整
    if (random < 0.35) { // 35%は直近 (0-7日)
      leadTime = Math.floor(Math.random() * 8);
    } else if (random < 0.60) { // 25%は短期 (8-30日)
      leadTime = 8 + Math.floor(Math.random() * 23);
    } else if (random < 0.85) { // 25%は中期 (31-90日)
      leadTime = 31 + Math.floor(Math.random() * 60);
    } else { // 15%は早期 (91日以上)
      leadTime = 91 + Math.floor(Math.random() * 90);
    }
    leadTimes.push(leadTime);
  }

  // シミュレーション結果を期間ごとに集計
  const bins: LeadTimeBin[] = [
    { name: '0-7日', count: 0 },
    { name: '8-14日', count: 0 },
    { name: '15-30日', count: 0 },
    { name: '31-60日', count: 0 },
    { name: '61-90日', count: 0 },
    { name: '91日以上', count: 0 },
  ];

  leadTimes.forEach(lt => {
    if (lt <= 7) bins[0].count++;
    else if (lt <= 14) bins[1].count++;
    else if (lt <= 30) bins[2].count++;
    else if (lt <= 60) bins[3].count++;
    else if (lt <= 90) bins[4].count++;
    else bins[5].count++;
  });

  return bins;
};

// 販売チャネル別売上のデモデータを生成する関数
export const generateChannelRevenueData = (): RevenueShare[] => ([
  { name: '自社サイト', value: 45000000 },
  { name: 'OTA-A', value: 32000000 },
  { name: 'OTA-B', value: 28000000 },
  { name: '旅行代理店', value: 15000000 },
  { name: 'その他', value: 5000000 },
]);

// プラン別売上のデモデータを生成する関数
export const generatePlanRevenueData = (): RevenueShare[] => ([
  { name: '【早割60】スタンダードプラン', value: 38000000 },
  { name: '通常料金プラン', value: 35000000 },
  { name: '【露天風呂付き客室】限定プラン', value: 27000000 },
  { name: '【直前割】素泊まり', value: 16000000 },
  { name: 'その他 seasonal プラン', value: 9000000 },
]);