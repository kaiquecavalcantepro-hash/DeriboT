
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeMarketSignal = async (
  priceData: number[], 
  macdHistory: any[], 
  volatility: number
) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analise os seguintes dados do BTC para operação de FUTUROS PERPÉTUOS (Apenas LONG).
      Preços Recentes: ${JSON.stringify(priceData.slice(-10))}
      Histórico MACD: ${JSON.stringify(macdHistory.slice(-5))}
      Volatilidade Selecionada: ${volatility}%
      
      Determine se é um momento propício para abrir LONG baseado em Tendência e MACD. 
      Responda APENAS em JSON no formato: {"signal": "OPEN" | "WAIT", "reason": "string", "confidence": number}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            signal: { type: Type.STRING },
            reason: { type: Type.STRING },
            confidence: { type: Type.NUMBER }
          },
          required: ["signal", "reason", "confidence"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Erro ao analisar sinal com Gemini:", error);
    return { signal: "WAIT", reason: "Erro na análise", confidence: 0 };
  }
};
