
import { GoogleGenAI, Type } from "@google/genai";
import type { PriceData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    productName: { type: Type.STRING },
    unit: { type: Type.STRING },
    currentPrice: {
      type: Type.OBJECT,
      properties: {
        price: { type: Type.STRING },
        location: { type: Type.STRING },
      },
      required: ['price', 'location'],
    },
    futurePrices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          period: { type: Type.STRING },
          price: { type: Type.STRING },
        },
        required: ['period', 'price'],
      },
    },
    analysis: { type: Type.STRING, description: "Análise curta, com no máximo 2 sentenças." },
  },
  required: ['productName', 'unit', 'currentPrice', 'futurePrices', 'analysis'],
};

export async function fetchAgriculturalPrices(productName: string): Promise<PriceData> {
  const prompt = `Pesquise os preços de hoje e futuros para '${productName}' no mercado agrícola brasileiro. Forneça uma breve análise de mercado com no máximo 2 sentenças. Use BRL como moeda.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const text = response.text.trim();
    let priceData: PriceData;

    try {
      priceData = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON response:", text);
      throw new Error("A IA retornou um formato de dados inesperado. Tente refinar sua busca.");
    }
    
    return priceData;

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    if (error instanceof Error && error.message.includes('SAFETY')) {
        throw new Error("A sua pesquisa foi bloqueada por filtros de segurança. Por favor, tente uma consulta diferente.");
    }
    throw new Error("Não foi possível buscar os dados. Verifique sua conexão ou tente novamente mais tarde.");
  }
}