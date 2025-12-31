
import React from 'react';
import { Position } from '../types';

interface PositionTableProps {
  positions: Position[];
  onClose: (id: string) => void;
}

const PositionTable: React.FC<PositionTableProps> = ({ positions, onClose }) => {
  return (
    <div className="bg-[#1e2329] rounded-lg border border-[#2b2f36] overflow-hidden">
      <div className="p-4 border-b border-[#2b2f36] flex justify-between items-center">
        <h3 className="font-bold text-gray-200">Posições Abertas</h3>
        <span className="text-xs text-gray-500">{positions.length} Ativas</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-xs text-gray-500 uppercase bg-[#161a1e]">
            <tr>
              <th className="px-4 py-3">Símbolo</th>
              <th className="px-4 py-3">Tamanho</th>
              <th className="px-4 py-3">Preço Entrada</th>
              <th className="px-4 py-3">Preço Marca</th>
              <th className="px-4 py-3">TP Automático</th>
              <th className="px-4 py-3">PNL Não Realizado</th>
              <th className="px-4 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2b2f36]">
            {positions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-gray-500 italic">
                  Nenhuma posição aberta no momento.
                </td>
              </tr>
            ) : (
              positions.map((pos) => (
                <tr key={pos.id} className="hover:bg-[#2b2f36]/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-200">{pos.symbol}</span>
                      <span className="text-[10px] text-green-400 font-bold uppercase">{pos.marginMode} {pos.leverage}x</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-300">
                    {pos.amount} BTC
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-300">
                    ${pos.entryPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-gray-300">
                    ${pos.markPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-green-400">
                    ${pos.tpPrice.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className={`font-mono font-bold ${pos.pnl >= 0 ? 'text-[#02c076]' : 'text-[#f6465d]'}`}>
                      {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)} USDT
                      <span className="text-[10px] ml-1">({pos.pnlPercentage.toFixed(2)}%)</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => onClose(pos.id)}
                      className="text-xs bg-[#2b2f36] hover:bg-[#f6465d] text-gray-300 hover:text-white px-3 py-1 rounded transition-all"
                    >
                      Fechar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PositionTable;
