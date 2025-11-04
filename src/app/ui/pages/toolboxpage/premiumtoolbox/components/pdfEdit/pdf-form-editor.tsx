"use client";

import React, { useState, useRef, useCallback } from "react";
import { FaWpforms, FaDownload, FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import type { PDFFile } from "./pdf-editor";

interface PDFFormEditorProps {
  selectedFile: PDFFile | null;
}

interface FormField {
  id: string;
  type: "text" | "checkbox" | "radio" | "select" | "textarea";
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  value: string;
  options?: string[];
  required: boolean;
}

const PDFFormEditor: React.FC<PDFFormEditorProps> = ({ selectedFile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedField, setSelectedField] = useState<FormField | null>(null);
  const [isAddingField, setIsAddingField] = useState(false);
  const [newFieldType, setNewFieldType] = useState<FormField["type"]>("text");
  const [showFieldEditor, setShowFieldEditor] = useState(false);

  const fieldTypes = [
    { value: "text", label: "Text Input" },
    { value: "textarea", label: "Text Area" },
    { value: "checkbox", label: "Checkbox" },
    { value: "radio", label: "Radio Button" },
    { value: "select", label: "Dropdown" },
  ];

  const addField = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isAddingField) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newField: FormField = {
        id: Date.now().toString(),
        type: newFieldType,
        x,
        y,
        width: newFieldType === "textarea" ? 200 : 150,
        height: newFieldType === "textarea" ? 80 : 30,
        label: `${newFieldType} field`,
        value: "",
        required: false,
        options:
          newFieldType === "select" || newFieldType === "radio"
            ? ["Option 1", "Option 2"]
            : undefined,
      };

      setFormFields((prev) => [...prev, newField]);
      setIsAddingField(false);
      setSelectedField(newField);
      setShowFieldEditor(true);
      redrawCanvas();
    },
    [isAddingField, newFieldType]
  );

  const selectField = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (isAddingField) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const clickedField = formFields.find(
        (field) =>
          x >= field.x &&
          x <= field.x + field.width &&
          y >= field.y &&
          y <= field.y + field.height
      );

      if (clickedField) {
        setSelectedField(clickedField);
        setShowFieldEditor(true);
      } else {
        setSelectedField(null);
      }

      redrawCanvas();
    },
    [formFields, isAddingField]
  );

  const updateField = useCallback((updatedField: FormField) => {
    setFormFields((prev) =>
      prev.map((field) => (field.id === updatedField.id ? updatedField : field))
    );
    setSelectedField(updatedField);
    redrawCanvas();
  }, []);

  const deleteField = useCallback(
    (fieldId: string) => {
      setFormFields((prev) => prev.filter((field) => field.id !== fieldId));
      if (selectedField?.id === fieldId) {
        setSelectedField(null);
        setShowFieldEditor(false);
      }
      redrawCanvas();
    },
    [selectedField]
  );

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear and draw PDF background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#000000";
    ctx.font = "16px Arial";
    ctx.fillText(`PDF: ${selectedFile?.name || "Document"}`, 20, 30);
    ctx.fillText("(PDF content would be rendered here)", 20, 60);

    if (isAddingField) {
      ctx.fillText(`Click to add ${newFieldType} field`, 20, 90);
    } else {
      ctx.fillText("Click on fields to edit them", 20, 90);
    }

    // Draw border
    ctx.strokeStyle = "#cccccc";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw form fields
    formFields.forEach((field) => {
      drawFormField(ctx, field, field.id === selectedField?.id);
    });
  }, [formFields, selectedField, isAddingField, newFieldType, selectedFile]);

  const drawFormField = (
    ctx: CanvasRenderingContext2D,
    field: FormField,
    isSelected: boolean
  ) => {
    // Draw field background
    ctx.fillStyle = isSelected ? "#e3f2fd" : "#f9fafc";
    ctx.fillRect(field.x, field.y, field.width, field.height);

    // Draw field border
    ctx.strokeStyle = isSelected ? "#2196f3" : "#cccccc";
    ctx.lineWidth = isSelected ? 2 : 1;
    ctx.strokeRect(field.x, field.y, field.width, field.height);

    // Draw field label
    ctx.fillStyle = "#333333";
    ctx.font = "12px Arial";
    ctx.fillText(field.label, field.x, field.y - 5);

    // Draw field type indicator
    ctx.fillStyle = "#666666";
    ctx.font = "10px Arial";
    ctx.fillText(`[${field.type}]`, field.x + field.width - 50, field.y - 5);

    // Draw field content based on type
    ctx.fillStyle = "#000000";
    ctx.font = "14px Arial";

    switch (field.type) {
      case "text":
      case "textarea":
        if (field.value) {
          ctx.fillText(field.value, field.x + 5, field.y + 20);
        } else {
          ctx.fillStyle = "#999999";
          ctx.fillText("Enter text...", field.x + 5, field.y + 20);
        }
        break;

      case "checkbox":
        ctx.strokeStyle = "#333333";
        ctx.strokeRect(field.x + 5, field.y + 5, 15, 15);
        if (field.value === "true") {
          ctx.fillStyle = "#333333";
          ctx.fillText("✓", field.x + 8, field.y + 17);
        }
        break;

      case "select":
        ctx.fillStyle = "#999999";
        ctx.fillText(
          field.value || "Select option...",
          field.x + 5,
          field.y + 20
        );
        ctx.fillText("▼", field.x + field.width - 20, field.y + 20);
        break;
    }
  };

  const generateFormPDF = useCallback(() => {
    // In a real implementation, you would generate a proper PDF with form fields
    const canvas = canvasRef.current;
    if (!canvas) return;

    redrawCanvas();

    setTimeout(() => {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `form_${selectedFile?.name || "document"}.png`;
          link.click();
          URL.revokeObjectURL(url);
        }
      });
    }, 100);
  }, [selectedFile, redrawCanvas]);

  React.useEffect(() => {
    if (selectedFile && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 1000;
      redrawCanvas();
    }
  }, [selectedFile, redrawCanvas]);

  if (!selectedFile) {
    return (
      <div className="pdf-form-editor">
        <div className="no-file-selected">
          <FaWpforms className="no-file-icon" />
          <h3>No PDF Selected</h3>
          <p>
            Please select a PDF file from the Upload tab to add form fields.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-form-editor">
      <div className="form-editor-header">
        <h2>
          <FaWpforms className="section-icon" />
          Form Editor
        </h2>
        <p>Add interactive form fields to "{selectedFile.name}"</p>
      </div>

      <div className="form-editor-toolbar">
        <div className="field-type-selector">
          <label>Field Type:</label>
          <select
            value={newFieldType}
            onChange={(e) =>
              setNewFieldType(e.target.value as FormField["type"])
            }
          >
            {fieldTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`add-field-btn ${isAddingField ? "active" : ""}`}
          onClick={() => setIsAddingField(!isAddingField)}
        >
          <FaPlus />
          {isAddingField ? "Cancel" : "Add Field"}
        </button>

        {formFields.length > 0 && (
          <button className="generate-btn" onClick={generateFormPDF}>
            <FaDownload />
            Generate Form
          </button>
        )}
      </div>

      <div className="form-editor-content">
        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            className="form-canvas"
            onClick={isAddingField ? addField : selectField}
          />
        </div>

        {showFieldEditor && selectedField && (
          <div className="field-editor">
            <h3>
              <FaEdit />
              Edit Field
            </h3>

            <div className="field-properties">
              <div className="property-group">
                <label>Label:</label>
                <input
                  type="text"
                  value={selectedField.label}
                  onChange={(e) =>
                    updateField({
                      ...selectedField,
                      label: e.target.value,
                    })
                  }
                />
              </div>

              <div className="property-group">
                <label>Width:</label>
                <input
                  type="number"
                  value={selectedField.width}
                  onChange={(e) =>
                    updateField({
                      ...selectedField,
                      width: Number.parseInt(e.target.value) || 150,
                    })
                  }
                />
              </div>

              <div className="property-group">
                <label>Height:</label>
                <input
                  type="number"
                  value={selectedField.height}
                  onChange={(e) =>
                    updateField({
                      ...selectedField,
                      height: Number.parseInt(e.target.value) || 30,
                    })
                  }
                />
              </div>

              {(selectedField.type === "select" ||
                selectedField.type === "radio") && (
                <div className="property-group">
                  <label>Options (one per line):</label>
                  <textarea
                    value={selectedField.options?.join("\n") || ""}
                    onChange={(e) =>
                      updateField({
                        ...selectedField,
                        options: e.target.value
                          .split("\n")
                          .filter((opt) => opt.trim()),
                      })
                    }
                  />
                </div>
              )}

              <div className="property-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedField.required}
                    onChange={(e) =>
                      updateField({
                        ...selectedField,
                        required: e.target.checked,
                      })
                    }
                  />
                  Required field
                </label>
              </div>

              <div className="field-actions">
                <button
                  className="delete-field-btn"
                  onClick={() => deleteField(selectedField.id)}
                >
                  <FaTrash />
                  Delete Field
                </button>
                <button
                  className="close-editor-btn"
                  onClick={() => setShowFieldEditor(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fields-list">
        <h3>Form Fields ({formFields.length})</h3>
        {formFields.length === 0 ? (
          <p className="no-fields">No form fields added yet</p>
        ) : (
          <div className="fields-summary">
            {formFields.map((field) => (
              <div
                key={field.id}
                className={`field-summary ${
                  selectedField?.id === field.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedField(field);
                  setShowFieldEditor(true);
                }}
              >
                <div className="field-summary-info">
                  <span className="field-type">[{field.type}]</span>
                  <span className="field-label">{field.label}</span>
                  {field.required && (
                    <span className="required-indicator">*</span>
                  )}
                </div>
                <button
                  className="delete-summary-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteField(field.id);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFFormEditor;
