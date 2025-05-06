// File: src/App.tsx
import React, { useState } from "react";
import "../scientificcalculator/ScientificCalculator.css";

interface CalculatorState {
  displayValue: string;
  previousValue: string | null;
  operator: string | null;
  waitingForOperand: boolean;
  memory: number;
  angleMode: "DEG" | "RAD";
  showHistory: boolean;
  history: string[];
  showSecondary: boolean;
}

const ScientificCalculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    displayValue: "0",
    previousValue: null,
    operator: null,
    waitingForOperand: false,
    memory: 0,
    angleMode: "DEG",
    showHistory: false,
    history: [],
    showSecondary: false,
  });

  const clearAll = (): void => {
    setState({
      ...state,
      displayValue: "0",
      previousValue: null,
      operator: null,
      waitingForOperand: false,
    });
  };

  const clearEntry = (): void => {
    setState({
      ...state,
      displayValue: "0",
      waitingForOperand: false,
    });
  };

  const toggleSign = (): void => {
    const newValue = parseFloat(state.displayValue) * -1;
    setState({
      ...state,
      displayValue: String(newValue),
    });
  };

  const inputPercent = (): void => {
    const currentValue = parseFloat(state.displayValue);
    const newValue = currentValue / 100;
    setState({
      ...state,
      displayValue: String(newValue),
      waitingForOperand: true,
    });
  };

  const inputDot = (): void => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        displayValue: "0.",
        waitingForOperand: false,
      });
    } else if (state.displayValue.indexOf(".") === -1) {
      setState({
        ...state,
        displayValue: state.displayValue + ".",
        waitingForOperand: false,
      });
    }
  };

  const inputDigit = (digit: string): void => {
    if (state.waitingForOperand) {
      setState({
        ...state,
        displayValue: digit,
        waitingForOperand: false,
      });
    } else {
      setState({
        ...state,
        displayValue:
          state.displayValue === "0" ? digit : state.displayValue + digit,
      });
    }
  };

  const performOperation = (nextOperator: string): void => {
    const inputValue = parseFloat(state.displayValue);

    if (state.previousValue === null) {
      setState({
        ...state,
        previousValue: state.displayValue,
        waitingForOperand: true,
        operator: nextOperator,
      });
    } else if (state.operator) {
      const previousValue = parseFloat(state.previousValue);
      let newValue: number;

      switch (state.operator) {
        case "+":
          newValue = previousValue + inputValue;
          break;
        case "-":
          newValue = previousValue - inputValue;
          break;
        case "×":
          newValue = previousValue * inputValue;
          break;
        case "÷":
          newValue = previousValue / inputValue;
          break;
        case "y^x":
          newValue = Math.pow(previousValue, inputValue);
          break;
        default:
          newValue = inputValue;
      }

      const formattedValue = formatResult(newValue);
      const historyEntry = `${state.previousValue} ${state.operator} ${state.displayValue} = ${formattedValue}`;

      setState({
        ...state,
        displayValue: formattedValue,
        previousValue: formattedValue,
        operator: nextOperator,
        waitingForOperand: true,
        history: [...state.history, historyEntry],
      });
    }
  };

  const formatResult = (value: number): string => {
    if (isNaN(value)) return "Error";
    if (!isFinite(value)) return value > 0 ? "Infinity" : "-Infinity";

    // For very large or small numbers, use scientific notation
    if (Math.abs(value) >= 1e10 || (Math.abs(value) < 1e-7 && value !== 0)) {
      return value.toExponential(8);
    }

    return String(parseFloat(value.toPrecision(12)));
  };

  const calculateResult = (): void => {
    if (state.previousValue !== null && state.operator) {
      performOperation("=");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (event.key >= "0" && event.key <= "9") {
      event.preventDefault();
      inputDigit(event.key);
    } else if (event.key === ".") {
      event.preventDefault();
      inputDot();
    } else if (event.key === "+") {
      event.preventDefault();
      performOperation("+");
    } else if (event.key === "-") {
      event.preventDefault();
      performOperation("-");
    } else if (event.key === "*") {
      event.preventDefault();
      performOperation("×");
    } else if (event.key === "/") {
      event.preventDefault();
      performOperation("÷");
    } else if (event.key === "Enter" || event.key === "=") {
      event.preventDefault();
      calculateResult();
    } else if (event.key === "Escape") {
      event.preventDefault();
      clearAll();
    } else if (event.key === "Backspace") {
      event.preventDefault();
      if (
        state.displayValue.length === 1 ||
        (state.displayValue.length === 2 && state.displayValue.startsWith("-"))
      ) {
        setState({
          ...state,
          displayValue: "0",
        });
      } else {
        setState({
          ...state,
          displayValue: state.displayValue.slice(0, -1),
        });
      }
    }
  };

  const handleScientificFunction = (func: string): void => {
    const value = parseFloat(state.displayValue);
    let result = 0;

    // Convert to radians if in DEG mode
    const valueInRadians =
      state.angleMode === "DEG" ? value * (Math.PI / 180) : value;

    switch (func) {
      case "sin":
        result = Math.sin(valueInRadians);
        break;
      case "cos":
        result = Math.cos(valueInRadians);
        break;
      case "tan":
        result = Math.tan(valueInRadians);
        break;
      case "asin":
        result = Math.asin(value);
        if (state.angleMode === "DEG") result = result * (180 / Math.PI);
        break;
      case "acos":
        result = Math.acos(value);
        if (state.angleMode === "DEG") result = result * (180 / Math.PI);
        break;
      case "atan":
        result = Math.atan(value);
        if (state.angleMode === "DEG") result = result * (180 / Math.PI);
        break;
      case "ln":
        result = Math.log(value);
        break;
      case "log":
        result = Math.log10(value);
        break;
      case "sqrt":
        result = Math.sqrt(value);
        break;
      case "x^2":
        result = Math.pow(value, 2);
        break;
      case "x^3":
        result = Math.pow(value, 3);
        break;
      case "10^x":
        result = Math.pow(10, value);
        break;
      case "e^x":
        result = Math.exp(value);
        break;
      case "1/x":
        result = 1 / value;
        break;
      case "pi":
        result = Math.PI;
        break;
      case "e":
        result = Math.E;
        break;
      case "abs":
        result = Math.abs(value);
        break;
      case "fact":
        if (value < 0 || value > 170 || value % 1 !== 0) {
          setState({
            ...state,
            displayValue: "Error",
            waitingForOperand: true,
          });
          return;
        }
        result = factorial(value);
        break;
      default:
        result = value;
    }

    const formattedResult = formatResult(result);
    const historyEntry = `${func}(${state.displayValue}) = ${formattedResult}`;

    setState({
      ...state,
      displayValue: formattedResult,
      waitingForOperand: true,
      history: [...state.history, historyEntry],
    });
  };

  const factorial = (n: number): number => {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const toggleAngleMode = (): void => {
    setState({
      ...state,
      angleMode: state.angleMode === "DEG" ? "RAD" : "DEG",
    });
  };

  const handleMemoryOperation = (operation: string): void => {
    const currentValue = parseFloat(state.displayValue);

    switch (operation) {
      case "MC":
        setState({ ...state, memory: 0 });
        break;
      case "MR":
        setState({
          ...state,
          displayValue: String(state.memory),
          waitingForOperand: true,
        });
        break;
      case "M+":
        setState({ ...state, memory: state.memory + currentValue });
        break;
      case "M-":
        setState({ ...state, memory: state.memory - currentValue });
        break;
      case "MS":
        setState({ ...state, memory: currentValue });
        break;
    }
  };

  const toggleHistory = (): void => {
    setState({ ...state, showHistory: !state.showHistory });
  };

  const clearHistory = (): void => {
    setState({ ...state, history: [] });
  };

  const toggleSecondaryFunctions = (): void => {
    setState({ ...state, showSecondary: !state.showSecondary });
  };

  return (
    <div className="calculator-wrapper">
      <div
        className="calculator-container"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="calculator">
          <div className="display">
            <div className="display-top">
              <div className="mode-indicator">
                <span
                  className={`memory-indicator ${
                    state.memory !== 0 ? "active" : ""
                  }`}
                >
                  M
                </span>
                <span className="angle-mode" onClick={toggleAngleMode}>
                  {state.angleMode}
                </span>
              </div>
              <div className="history-toggle" onClick={toggleHistory}>
                <span>↑</span>
              </div>
            </div>
            <div className="display-main">{state.displayValue}</div>
          </div>

          {state.showHistory && (
            <div className="history-panel">
              <div className="history-header">
                <h3>History</h3>
                <button onClick={clearHistory}>Clear</button>
              </div>
              <div className="history-list">
                {state.history.length === 0 ? (
                  <div className="history-empty">No history yet</div>
                ) : (
                  state.history.map((entry, index) => (
                    <div className="history-item" key={index}>
                      {entry}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          <div className="keypad">
            <div className="memory-keys">
              <button onClick={() => handleMemoryOperation("MC")}>MC</button>
              <button onClick={() => handleMemoryOperation("MR")}>MR</button>
              <button onClick={() => handleMemoryOperation("M+")}>M+</button>
              <button onClick={() => handleMemoryOperation("M-")}>M-</button>
              <button onClick={() => handleMemoryOperation("MS")}>MS</button>
            </div>

            <div className="function-keys">
              <button
                className={state.showSecondary ? "active" : ""}
                onClick={toggleSecondaryFunctions}
              >
                2nd
              </button>
              <button onClick={() => handleScientificFunction("pi")}>π</button>
              <button onClick={() => handleScientificFunction("e")}>e</button>
              <button onClick={clearAll}>C</button>
              <button onClick={clearEntry}>CE</button>
              <button
                onClick={() => {
                  if (
                    state.displayValue.length === 1 ||
                    (state.displayValue.length === 2 &&
                      state.displayValue.startsWith("-"))
                  ) {
                    setState({
                      ...state,
                      displayValue: "0",
                    });
                  } else {
                    setState({
                      ...state,
                      displayValue: state.displayValue.slice(0, -1),
                    });
                  }
                }}
              >
                ⌫
              </button>
            </div>

            <div className="scientific-keys">
              {state.showSecondary ? (
                <>
                  <button onClick={() => handleScientificFunction("asin")}>
                    sin⁻¹
                  </button>
                  <button onClick={() => handleScientificFunction("acos")}>
                    cos⁻¹
                  </button>
                  <button onClick={() => handleScientificFunction("atan")}>
                    tan⁻¹
                  </button>
                  <button onClick={() => handleScientificFunction("10^x")}>
                    10^x
                  </button>
                  <button onClick={() => handleScientificFunction("e^x")}>
                    e^x
                  </button>
                  <button onClick={() => handleScientificFunction("x^3")}>
                    x³
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleScientificFunction("sin")}>
                    sin
                  </button>
                  <button onClick={() => handleScientificFunction("cos")}>
                    cos
                  </button>
                  <button onClick={() => handleScientificFunction("tan")}>
                    tan
                  </button>
                  <button onClick={() => handleScientificFunction("log")}>
                    log
                  </button>
                  <button onClick={() => handleScientificFunction("ln")}>
                    ln
                  </button>
                  <button onClick={() => handleScientificFunction("x^2")}>
                    x²
                  </button>
                </>
              )}
            </div>

            <div className="main-keypad">
              <button onClick={() => handleScientificFunction("sqrt")}>
                √
              </button>
              <button onClick={() => performOperation("y^x")}>y^x</button>
              <button onClick={() => handleScientificFunction("1/x")}>
                1/x
              </button>
              <button onClick={() => handleScientificFunction("abs")}>
                |x|
              </button>
              <button onClick={() => handleScientificFunction("fact")}>
                n!
              </button>

              <button className="number" onClick={() => inputDigit("7")}>
                7
              </button>
              <button className="number" onClick={() => inputDigit("8")}>
                8
              </button>
              <button className="number" onClick={() => inputDigit("9")}>
                9
              </button>
              <button
                className="operator"
                onClick={() => performOperation("÷")}
              >
                ÷
              </button>
              <button onClick={inputPercent}>%</button>

              <button className="number" onClick={() => inputDigit("4")}>
                4
              </button>
              <button className="number" onClick={() => inputDigit("5")}>
                5
              </button>
              <button className="number" onClick={() => inputDigit("6")}>
                6
              </button>
              <button
                className="operator"
                onClick={() => performOperation("×")}
              >
                ×
              </button>
              <button onClick={toggleSign}>±</button>

              <button className="number" onClick={() => inputDigit("1")}>
                1
              </button>
              <button className="number" onClick={() => inputDigit("2")}>
                2
              </button>
              <button className="number" onClick={() => inputDigit("3")}>
                3
              </button>
              <button
                className="operator"
                onClick={() => performOperation("-")}
              >
                −
              </button>
              <button className="equals" onClick={calculateResult}>
                =
              </button>

              <button className="number zero" onClick={() => inputDigit("0")}>
                0
              </button>
              <button onClick={inputDot}>.</button>
              <button
                className="operator"
                onClick={() => performOperation("+")}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
