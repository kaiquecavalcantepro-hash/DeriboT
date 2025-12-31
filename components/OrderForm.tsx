
import React, { useState } from 'react';
import { MarginMode, PositionMode, TradeConfig } from '../types';

interface OrderFormProps {
  currentPrice: number;
  onOpenLong: (config: TradeConfig) => void;
  config: TradeConfig;
  setConfig: React.Dispatch<React.SetStateAction<TradeConfig>>;
}

const OrderForm: React.FC<OrderFormProps> = ({ currentPrice, onOpenLong, config, setConfig }) => {
  const [leverageInput, setLeverageInput] = useState(config.leverage.toString());
  const volatilityLevels = [0.3, 0.5, 1.0, 1.5];

  const handleOpen = () => {
    const lev = parseInt(leverageInput);
    if (isNaN(lev) || lev < 1 || lev > 125) return;
    onOpenLong({ ...config, leverage: lev });
  };

  return (
    <div className="bg-[#1e2329] p-4 rounded-lg flex flex-col gap-4 border border-[#2b2f36] w-full lg:w-80">
      <div className="flex gap-2">
        <button 
          className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${config.marginMode === MarginMode.ISOLATED ? 'bg-[#f0b90b] text-[#0b0e11]' : 'bg-[#2b2f36] text-gray-400'}`}
          onClick={() => setConfig(prev => ({ ...prev, marginMode: MarginMode.ISOLATED }))}
        >
          ISOLADA
        </button>
        <button 
          className={`flex-1 py-2 text-xs font-bold rounded transition-colors ${config.marginMode === MarginMode.CROSS ? 'bg-[#f0b90b] text-[#0b0e11]' : 'bg-[#2b2f36] text-gray-400'}`}
          onClick={() => setConfig(prev => ({ ...prev, marginMode: MarginMode.CROSS }))}
        >
          CRUZADA
        </button>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Alavancagem (Manual)</label>
        <div className="flex items-center gap-2">
          <input 
            type="number"
            className="w-full bg-[#161a1e] border border-[#2b2f36] p-2.5 rounded text-sm text-white focus:border-[#f0b90b] outline-none font-mono"
            value={leverageInput}
            onChange={(e) => setLeverageInput(e.target.value)}
          />
          <div className="px-3 py-2 bg-[#2b2f36] rounded text-[#f0b90b] font-bold font-mono text-sm">x{leverageInput}</div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Gatilho Volatilidade (Threshold)</label>
        <div className="grid grid-cols-4 gap-1.5">
          {volatilityLevels.map(v => (
            <button
              key={v}
              className={`py-2 text-[10px] font-bold rounded border transition-all ${config.volatilityThreshold === v ? 'bg-[#f0b90b]/10 border-[#f0b90b] text-[#f0b90b]' : 'border-[#2b2f36] text-gray-500 hover:border-[#474d57]'}`}
              onClick={() => setConfig(prev => ({ ...prev, volatilityThreshold: v }))}
            >
              {v}%
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Take Profit Automático (%)</label>
        <div className="relative">
          <input 
            type="number"
            step="0.1"
            className="w-full bg-[#161a1e] border border-[#2b2f36] p-2.5 rounded text-sm text-white focus:border-[#f0b90b] outline-none font-mono"
            value={config.tpPercentage}
            onChange={(e) => setConfig(prev => ({ ...prev, tpPercentage: parseFloat(e.target.value) || 0 }))}
          />
          <span className="absolute right-3 top-2.5 text-xs text-gray-600 font-mono">%</span>
        </div>
        <p className="text-[9px] text-gray-600 italic">* TP é obrigatório para abertura via Deribot.</p>
      </div>

      <div className="bg-[#161a1e] p-3 rounded-lg border border-[#2b2f36] mt-2 space-y-2">
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500 uppercase font-medium">Preço Atual:</span>
          <span className="text-white font-mono">${currentPrice > 0 ? currentPrice.toLocaleString() : '---'}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-gray-500 uppercase font-medium">Preço Target:</span>
          <span className="text-green-400 font-mono font-bold">${currentPrice > 0 ? (currentPrice * (1 + config.tpPercentage / 100)).toLocaleString() : '---'}</span>
        </div>
      </div>

      <button 
        className="w-full bg-[#02c076] hover:bg-[#03d383] text-[#0b0e11] py-4 rounded-xl font-black text-sm transition-all shadow-lg active:scale-95 uppercase tracking-widest"
        onClick={handleOpen}
      >
        ABRIR LONG (COMPRA)
      </button>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="hedge-mode"
            checked={config.positionMode === PositionMode.HEDGE}
            onChange={(e) => setConfig(prev => ({ ...prev, positionMode: e.target.checked ? PositionMode.HEDGE : PositionMode.ONE_WAY }))}
            className="accent-[#f0b90b] w-4 h-4"
          />
          <label htmlFor="hedge-mode" className="text-[10px] text-gray-400 font-bold uppercase cursor-pointer">Modo Red (Hedge)</label>
        </div>
        <span className="text-[9px] text-red-500/80 font-black tracking-widest uppercase">Shorts Desativados</span>
      </div>
    </div>
  );
};

export default OrderForm;
