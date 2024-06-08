import axios from "axios";

export const getLocalCurrency = async (): Promise<string> => {
  try {
    const response = await axios.get("https://ipapi.co/currency/");
    console.log("currency", response.data);
    const localCurrencyCode = response.data;

    if (localCurrencyCode) {
      return localCurrencyCode;
    } else {
      const defaultCurrencyCode = "USD";
      console.warn(
        "Failed to fetch local currency from ipapi.co. Using default currency code:",
        defaultCurrencyCode
      );
      return defaultCurrencyCode;
    }
  } catch (error) {
    console.error("Error fetching local currency:", error);
    const defaultCurrencyCode = "USD";
    console.warn(
      "Error fetching local currency. Using default currency code:",
      defaultCurrencyCode
    );
    return defaultCurrencyCode;
  }
};

export const convertToCurrency = async (amount: number): Promise<string> => {
  try {
    const targetCurrency = await getLocalCurrency();
    const response = await axios.get(
      `https://api.exchangerate-api.com/v4/latest/GBP`
    );

    const exchangeRate = response.data.rates[targetCurrency];
    if (!exchangeRate) {
      throw new Error(`Exchange rate for ${targetCurrency} not found`);
    }

    const convertedAmount = amount * exchangeRate;

    // Format the result using Intl.NumberFormat
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: targetCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(convertedAmount);
  } catch (error) {
    console.error("Error converting currency:", error);

    // Fallback to formatting the amount in GBP if conversion fails
    const formatter = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(amount);
  }
};
