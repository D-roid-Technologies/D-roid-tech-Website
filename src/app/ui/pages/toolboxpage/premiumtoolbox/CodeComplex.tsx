import React from "react";

interface CodeComplexProps {
  onClose: () => void;
}

const CodeComplex: React.FC<CodeComplexProps> = ({ onClose }) => {
  return (
    <div>
      <h1>Premium Toolbox - Code Complexity</h1>
      <p>
        Welcome to the premium code complexity analysis tool. More features
        coming soon!
      </p>
    </div>
  );
};

export default CodeComplex;
