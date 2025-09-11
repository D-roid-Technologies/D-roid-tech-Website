// ScientificCalculatorFeatures.tsx
import React from "react";
import FeaturesTemplate from "../../../pages/toolboxpage/FeaturesTemplate";
import {
  FaCalculator,
  FaHistory,
  FaMemory,
  FaRulerCombined,
  FaSyncAlt,
  FaKeyboard,
  FaLock,
} from "react-icons/fa";

const ScientificCalculatorFeatures: React.FC = () => {
  const features = [
    {
      title: "Full Scientific Functions",
      description:
        "Supports trigonometric, logarithmic, exponential, factorial, roots, powers, and constants like π and e.",
      icon: <FaCalculator />,
    },
    {
      title: "Angle Modes (DEG/RAD)",
      description:
        "Switch seamlessly between degree and radian modes for accurate trigonometric calculations.",
      icon: <FaRulerCombined />,
    },
    {
      title: "History Panel",
      description:
        "View, scroll, and clear past calculations with an interactive history panel.",
      icon: <FaHistory />,
    },
    {
      title: "Memory Functions",
      description:
        "Store, recall, add, subtract, and clear memory values with standard MC/MR/MS/M+/M− keys.",
      icon: <FaMemory />,
    },
    {
      title: "Secondary Functions",
      description:
        "Access extended scientific operations (inverse trig, cube powers, 10^x, e^x, etc.) with the 2nd key.",
      icon: <FaSyncAlt />,
    },
    {
      title: "Keyboard Shortcuts",
      description:
        "Type numbers and operators directly from your keyboard for faster calculations.",
      icon: <FaKeyboard />,
    },
    {
      title: "Offline & Private",
      description:
        "All calculations happen client-side, ensuring privacy and zero data uploads.",
      icon: <FaLock />,
    },
  ];

  const technicalSpecs = [
    "Supported Functions: +, −, ×, ÷, %, powers, roots, factorial, abs, sin, cos, tan, log, ln, e^x, 10^x",
    "Angle Modes: Degrees (DEG) and Radians (RAD)",
    "Memory Keys: MC, MR, M+, M−, MS",
    "History: Scrollable history panel with clear option",
    "Keyboard Support: Numbers, operators, Enter, Backspace, Escape",
    "Error Handling: NaN, Infinity, and invalid factorial checks",
    "Performance: Instant client-side calculation (no server required)",
  ];

  return (
    <FeaturesTemplate
      title="Scientific Calculator Features"
      subtitle="A powerful, privacy-first scientific calculator with memory, history, and full scientific functions"
      features={features}
      technicalSpecs={technicalSpecs}
    />
  );
};

export default ScientificCalculatorFeatures;
