
export interface CurrentPrice {
  price: string;
  location: string;
}

export interface FuturePrice {
  period: string;
  price: string;
}

export interface PriceData {
  productName: string;
  unit: string;
  currentPrice: CurrentPrice;
  futurePrices: FuturePrice[];
  analysis: string;
}

export interface GroundingSource {
  web: {
    uri: string;
    title: string;
  };
}
