
import React from 'react';
import { 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area
} from 'recharts';

interface ChartProps {
  data: any[];
}

const TradingChart: React.FC<ChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full bg-[#161a1e] rounded-lg p-4 border border-[#2b2f36]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-200">BTC/USDT Perpetual</h3>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 bg-green-900/30 text-green-400 rounded border border-green-800">Tendência: Alta</span>
          <span className="text-xs px-2 py-1 bg-blue-900/30 text-blue-400 rounded border border-blue-800">MACD: Positivo</span>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#02c076" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#02c076" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b2f36" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis domain={['auto', 'auto']} orientation="right" tick={{fill: '#848e9c', fontSize: 10}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e2329', border: '1px solid #2b2f36', color: '#eaecef' }}
              itemStyle={{ color: '#02c076' }}
            />
            <Area type="monotone" dataKey="price" stroke="#02c076" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="h-[100px] w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2b2f36" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e2329', border: '1px solid #2b2f36', color: '#eaecef' }}
            />
            <Bar dataKey="histogram" fill="#474d57">
              {data.map((entry, index) => (
                <cell key={`cell-${index}`} fill={entry.histogram >= 0 ? '#02c076' : '#f6465d'} />
              ))}
            </Bar>
            <Line type="monotone" dataKey="macd" stroke="#2b8cf1" dot={false} strokeWidth={1} />
            <Line type="monotone" dataKey="signal" stroke="#f0b90b" dot={false} strokeWidth={1} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TradingChart;
