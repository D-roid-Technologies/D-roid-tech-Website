import React, { useState, useEffect } from "react";
import { ArrowUpDown, TrendingUp, DollarSign } from "lucide-react";
import "./CurrencyConvert.css";

// 👇 Replace with your OpenExchangeRates API key
const API_KEY = "6b5ed730154a44e183e9a99b0206b0a6";

const CurrencyConvert: React.FC = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "Fr" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  ];

  // Fetch conversion whenever dependencies change
  useEffect(() => {
    const fetchConversion = async () => {
      try {
        setLoading(true);
        const numAmount = parseFloat(amount);

        if (!isNaN(numAmount) && fromCurrency && toCurrency) {
          const response = await fetch(
            `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}`
          );
          const data = await response.json();

          if (!data.rates[fromCurrency] || !data.rates[toCurrency]) {
            throw new Error("Invalid currency code");
          }

          const rate = data.rates[toCurrency] / data.rates[fromCurrency];
          const result = numAmount * rate;

          setConvertedAmount(result);
          setLastUpdated(new Date().toLocaleString());
        }
      } catch (error) {
        console.error("Error converting currency:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversion();
  }, [amount, fromCurrency, toCurrency]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const formatCurrency = (value: number, currencyCode: string): string => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return `${currency?.symbol || ""}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="premium-converter-container">
      <div className="premium-converter-card">
        <div className="premium-converter-header">
          <h1 className="premium-converter-title">
            <DollarSign size={28} />
            Currency Converter
          </h1>
          <p className="premium-converter-subtitle">
            Powered by OpenExchangeRates
          </p>
        </div>

        {loading ? (
          <div className="premium-converter-loading">
            <div className="premium-converter-loading-spinner"></div>
            Converting...
          </div>
        ) : (
          <div className="premium-converter-body">
            <div className="premium-converter-input-group">
              <label className="premium-converter-label">From</label>
              <div className="premium-converter-input-wrapper">
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="premium-converter-amount-input"
                  placeholder="0.00"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="premium-converter-currency-select"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="premium-converter-swap-container">
              <button
                onClick={handleSwapCurrencies}
                className="premium-converter-swap-button"
                title="Swap currencies"
              >
                <ArrowUpDown size={20} />
              </button>
            </div>

            <div className="premium-converter-input-group">
              <label className="premium-converter-label">To</label>
              <div className="premium-converter-input-wrapper">
                <input
                  type="text"
                  value={convertedAmount.toFixed(2)}
                  readOnly
                  className="premium-converter-amount-input"
                  style={{ opacity: 0.6 }}
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="premium-converter-currency-select"
                >
                  {currencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="premium-converter-result-card">
              <div className="premium-converter-result-label">
                Converted Amount
              </div>
              <div className="premium-converter-result-amount">
                {formatCurrency(convertedAmount, toCurrency)}
                <TrendingUp size={20} className="premium-converter-trend-icon" />
              </div>
            </div>

            <div className="premium-converter-rate-info">
              Last updated: {lastUpdated}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConvert;
