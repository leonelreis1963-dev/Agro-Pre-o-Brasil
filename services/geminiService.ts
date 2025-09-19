
import { GoogleGenAI } from "@google/genai";
import type { PriceData, GroundingSource } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function fetchAgriculturalPrices(productName: string): Promise<{ priceData: PriceData; sources: GroundingSource[] }> {
  const prompt = `Forneça o preço de hoje e os preços futuros para '${productName}' no mercado brasileiro. A resposta DEVE SER um objeto JSON, e APENAS o objeto JSON, com a seguinte estrutura: { "productName": string, "unit": string, "currentPrice": { "price": string, "location": string }, "futurePrices": [{ "period": string, "price": string }], "analysis": string }. Use BRL como moeda. Não inclua a palavra 'json' ou \`\`\`json no início ou no fim. A análise deve ser curta, com no máximo 2 sentenças.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
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
    
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingSource[] || [];

    return { priceData, sources };

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Não foi possível buscar os dados. Verifique sua conexão ou tente novamente mais tarde.");
  }
}
