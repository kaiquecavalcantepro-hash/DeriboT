
import React, { useState, useEffect } from 'react';
import { BingXService } from '../services/bingxService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onConnected }) => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');

  useEffect(() => {
    const creds = BingXService.getCredentials();
    if (creds) {
      setApiKey(creds.apiKey);
      setApiSecret(creds.apiSecret);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!apiKey || !apiSecret) return;
    BingXService.setCredentials({ apiKey, apiSecret });
    onConnected();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#1e2329] border border-[#2b2f36] w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-[#2b2f36] flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Configuração BingX</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-yellow-900/20 border border-yellow-700/30 p-3 rounded text-xs text-yellow-200 leading-relaxed">
            <strong>Aviso de Segurança:</strong> Suas chaves são salvas apenas localmente no navegador (LocalStorage). Use chaves com permissão exclusiva de "Futures Trading".
          </div>
          
          <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase font-bold">BingX API Key</label>
            <input 
              type="text" 
              className="w-full bg-[#161a1e] border border-[#2b2f36] p-3 rounded text-sm text-white focus:border-[#f0b90b] outline-none font-mono"
              placeholder="Sua API Key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-gray-400 uppercase font-bold">BingX API Secret</label>
            <input 
              type="password" 
              className="w-full bg-[#161a1e] border border-[#2b2f36] p-3 rounded text-sm text-white focus:border-[#f0b90b] outline-none font-mono"
              placeholder="Seu API Secret"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
            />
          </div>

          <div className="pt-4">
            <button 
              onClick={handleSave}
              className="w-full bg-[#f0b90b] hover:bg-[#d8a60a] text-[#0b0e11] py-3 rounded font-bold transition-all shadow-lg"
            >
              SALVAR E CONECTAR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
