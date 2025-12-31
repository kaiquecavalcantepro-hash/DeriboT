
export enum MarginMode {
  ISOLATED = 'ISOLATED',
  CROSS = 'CROSS'
}

export enum PositionMode {
  ONE_WAY = 'ONE_WAY',
  HEDGE = 'HEDGE'
}

export interface MarketData {
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume: number;
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
  trend: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export interface Position {
  id: string;
  symbol: string;
  side: 'LONG';
  entryPrice: number;
  markPrice: number;
  amount: number;
  leverage: number;
  margin: number;
  tpPrice: number;
  pnl: number;
  pnlPercentage: number;
  marginMode: MarginMode;
  timestamp: number;
}

export interface TradeConfig {
  leverage: number;
  volatilityThreshold: number; // 0.3, 0.5, 1.0, 1.5
  tpPercentage: number;
  marginMode: MarginMode;
  positionMode: PositionMode;
}
