import axios from "axios";
import { getUserLocation } from "./locationUtils";

const API_KEY= process.env.CURRENCY_API_KEY;

export const getLocalCurrency = async (): Promise<string> => {
  try {
    const { latitude, longitude } = await getUserLocation();
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD?apiKey=${API_KEY}&base=USD&format=json`
    );

    const localCurrencyCode = "GBP";

    return localCurrencyCode;
  } catch (error) {
    console.error("Error fetching local currency:", error);
    return "USD";
  }
};

export const convertToCurrency = async (
  amount: number,
  targetCurrency: string
): Promise<string> => {
  try {
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/USD?apiKey=${API_KEY}&base=USD&symbols=${targetCurrency}&format=json`
    );

    const exchangeRate = response.data.rates[targetCurrency];
    const convertedAmount = amount * exchangeRate;

    return convertedAmount.toFixed(2);
  } catch (error) {
    console.error("Error converting currency:", error);
    return amount.toFixed(2);
  }
};
