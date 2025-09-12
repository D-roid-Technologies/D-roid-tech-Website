import React, { useState, useEffect } from "react";
import { ArrowUpDown, TrendingUp, DollarSign } from "lucide-react";
import "./CurrencyConvert.css";

interface CurrencyRate {
  [key: string]: number;
}

interface CurrencyData {
  rates: CurrencyRate;
  base: string;
  date: string;
}

const CurrencyConvert: React.FC = () => {
  const [amount, setAmount] = useState<string>("1");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [rates, setRates] = useState<CurrencyRate>({});
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  // Popular currencies with their symbols
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

  // Mock exchange rates (fetch from an API)
  useEffect(() => {
    const mockRates: CurrencyRate = {
      USD: 1,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.12,
      CAD: 1.25,
      AUD: 1.35,
      CHF: 0.92,
      CNY: 6.45,
      INR: 74.25,
      NGN: 411.5,
    };

    setTimeout(() => {
      setRates(mockRates);
      setLoading(false);
      setLastUpdated(new Date().toLocaleString());
    }, 1000);
  }, []);

  // Calculate conversion
  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency] && amount) {
      const numAmount = parseFloat(amount);
      if (!isNaN(numAmount)) {
        const baseAmount = numAmount / rates[fromCurrency];
        const converted = baseAmount * rates[toCurrency];
        setConvertedAmount(converted);
      }
    }
  }, [amount, fromCurrency, toCurrency, rates]);

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
          <p className="premium-converter-subtitle">Real-time exchange rates</p>
        </div>

        {loading ? (
          <div className="premium-converter-loading">
            <div className="premium-converter-loading-spinner"></div>
            Loading exchange rates...
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
                  value="1.00"
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
                <TrendingUp
                  size={20}
                  className="premium-converter-trend-icon"
                />
              </div>
            </div>

            <div className="premium-converter-rate-info">
              1 {fromCurrency} ={" "}
              {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)}{" "}
              {toCurrency}
              <br />
              <small>Last updated: {lastUpdated}</small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConvert;
