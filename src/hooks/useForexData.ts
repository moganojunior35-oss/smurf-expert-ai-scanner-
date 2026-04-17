import { useState, useEffect } from 'react';
import { Trade, Signal, AccountStats } from '../types';

export const useForexData = () => {
  const [stats, setStats] = useState<AccountStats>({
    balance: 12540.50,
    equity: 12890.20,
    margin: 100.00,
    todayProfit: 349.70,
    totalProfit: 2540.50
  });

  const [trades, setTrades] = useState<Trade[]>([
    {
      id: '1',
      pair: 'EUR/USD',
      type: 'BUY',
      entry: 1.0854,
      tp: 1.0920,
      sl: 1.0820,
      profit: 145.20,
      status: 'CLOSED',
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);

  const [signals, setSignals] = useState<Signal[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  // Simulate scanning
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    
    const startScan = () => {
      setIsScanning(true);
      timeout = setTimeout(() => {
        const pairs = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'AUD/USD', 'USD/CHF'];
        const newSignal: Signal = {
          id: Math.random().toString(36).substr(2, 9),
          pair: pairs[Math.floor(Math.random() * pairs.length)],
          assetType: 'FOREX',
          type: Math.random() > 0.5 ? 'BUY' : 'SELL',
          price: 1.0000 + Math.random() * 0.1,
          sl: 1.0000,
          tp: 1.1000,
          confidence: Math.floor(Math.random() * 40) + 60,
          timeframe: 'H1',
          timestamp: new Date(),
          strength: 85,
          analysis: {
            htfDirection: 'BULLISH',
            mss: true,
            liquiditySweep: true,
            fvgDetected: true,
            orderBlock: true,
            killzone: true,
            premiumDiscount: 'DISCOUNT',
            riskReward: 3.5,
            displacement: true
          }
        };
        setSignals(prev => [newSignal, ...prev].slice(0, 5));
        setIsScanning(false);
        
        // Schedule next scan
        timeout = setTimeout(startScan, 15000);
      }, 5000);
    };

    startScan();
    return () => clearTimeout(timeout);
  }, []);

  return { stats, trades, signals, isScanning };
};