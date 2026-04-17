import { LucideIcon } from 'lucide-react';

export type AssetType = 'INDICES' | 'COMMODITIES' | 'CRYPTO' | 'FOREX';

export interface ICTAnalysis {
  htfDirection: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  mss: boolean;
  liquiditySweep: boolean;
  fvgDetected: boolean;
  orderBlock: boolean;
  killzone: boolean;
  premiumDiscount: 'PREMIUM' | 'DISCOUNT' | 'EQUILIBRIUM';
  riskReward: number;
  displacement: boolean;
}

export interface ContractSpecs {
  symbol: string;
  type: AssetType;
  pipValue: number;
  minRR: number;
}

export interface Trade {
  id: string;
  pair: string;
  type: 'BUY' | 'SELL';
  entry: number;
  exit?: number;
  tp: number;
  sl: number;
  profit: number;
  status: 'OPEN' | 'CLOSED';
  timestamp: Date;
}

export interface Signal {
  id: string;
  pair: string;
  assetType: AssetType;
  type: 'BUY' | 'SELL';
  price: number;
  sl: number;
  tp: number;
  confidence: number;
  timeframe: string;
  timestamp: Date;
  analysis: ICTAnalysis;
  strength: number;
}

export interface NavItem {
  title: string;
  icon: LucideIcon;
  id: string;
}

export interface AccountStats {
  balance: number;
  equity: number;
  margin: number;
  todayProfit: number;
  totalProfit: number;
}