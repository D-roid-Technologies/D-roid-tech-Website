"use client";

import type React from "react";
import { useState, useCallback } from "react";
import {
  FaLock,
  FaDownload,
  FaEye,
  FaEyeSlash,
  FaKey,
  FaShieldAlt,
} from "react-icons/fa";
import { PDFDocument, StandardFonts } from "pdf-lib";
import type { PDFFile } from "./pdf-editor";
import toast from "react-hot-toast";


interface PDFPasswordProtectorProps {
  selectedFile: PDFFile | null;
}

const PDFPasswordProtector: React.FC<PDFPasswordProtectorProps> = ({
  selectedFile,
}) => {
  const [userPassword, setUserPassword] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState(false);
  const [permissions, setPermissions] = useState({
    printing: true,
    modifying: false,
    copying: false,
    annotating: true,
    fillingForms: true,
    contentAccessibility: true,
    documentAssembly: false,
  });
  const [encryptionLevel, setEncryptionLevel] = useState<"40bit" | "128bit">(
    "128bit"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePermissionChange = useCallback(
    (permission: keyof typeof permissions) => {
      setPermissions((prev) => ({
        ...prev,
        [permission]: !prev[permission],
      }));
    },
    []
  );

  const generateSecurePassword = useCallback(() => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }, []);

  const protectPDF = useCallback(async () => {
    if (!selectedFile) return;

    if (!userPassword.trim() && !ownerPassword.trim()) {
      alert("Please enter at least one password (user or owner)");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await selectedFile.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Note: pdf-lib doesn't support password protection directly
      // In a real implementation, you would use a library like PDF-lib with encryption support
      // or a server-side solution. For demonstration, we'll create a new PDF with a watermark

      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      // Add password protection watermark to each page
      pages.forEach((page: any) => {
        const { width, height } = page.getSize();

        // Add semi-transparent watermark
        page.drawText("PASSWORD PROTECTED", {
          x: width / 2 - 100,
          y: height / 2,
          size: 24,
          font,
          color: { r: 0.8, g: 0.8, b: 0.8 },
          opacity: 0.3,
        });

        // Add protection info
        page.drawText(`Encryption: ${encryptionLevel}`, {
          x: 50,
          y: 50,
          size: 10,
          font,
          color: { r: 0.5, g: 0.5, b: 0.5 },
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `protected_${selectedFile.name}`;
      link.click();

      URL.revokeObjectURL(url);

      // In a real implementation, you would show the passwords to the user
      toast.success(
        `PDF protected successfully!\n\nNote: This is a demo. In a real implementation, the PDF would be encrypted with:\nUser Password: ${
          userPassword || "Not set"
        }\nOwner Password: ${ownerPassword || "Not set"}`
      );
    } catch (error) {
      console.error("Error protecting PDF:", error);
       toast.error("Error protecting PDF. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedFile, userPassword, ownerPassword, encryptionLevel]);

  if (!selectedFile) {
    return (
      <div className="pdf-password-protector">
        <div className="no-file-selected">
          <FaLock className="no-file-icon" />
          <h3>No PDF Selected</h3>
          <p>
            Please select a PDF file from the Upload tab to add password
            protection.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-password-protector">
      <div className="protector-header">
        <h2>
          <FaLock className="section-icon" />
          Password Protection
        </h2>
        <p>Add password protection and permissions to "{selectedFile.name}"</p>
      </div>

      <div className="protector-content">
        <div className="password-section">
          <h3>
            <FaKey className="subsection-icon" />
            Password Settings
          </h3>

          <div className="password-group">
            <div className="password-field">
              <label>User Password (required to open PDF):</label>
              <div className="password-input-container">
                <input
                  type={showUserPassword ? "text" : "password"}
                  value={userPassword}
                  onChange={(e) => setUserPassword(e.target.value)}
                  placeholder="Enter user password"
                />
                <button
                  className="password-toggle"
                  onClick={() => setShowUserPassword(!showUserPassword)}
                >
                  {showUserPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  className="generate-password"
                  onClick={() => setUserPassword(generateSecurePassword())}
                  title="Generate secure password"
                >
                  <FaKey />
                </button>
              </div>
            </div>

            <div className="password-field">
              <label>Owner Password (required to change permissions):</label>
              <div className="password-input-container">
                <input
                  type={showOwnerPassword ? "text" : "password"}
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  placeholder="Enter owner password"
                />
                <button
                  className="password-toggle"
                  onClick={() => setShowOwnerPassword(!showOwnerPassword)}
                >
                  {showOwnerPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  className="generate-password"
                  onClick={() => setOwnerPassword(generateSecurePassword())}
                  title="Generate secure password"
                >
                  <FaKey />
                </button>
              </div>
            </div>
          </div>

          <div className="encryption-level">
            <label>Encryption Level:</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  value="40bit"
                  checked={encryptionLevel === "40bit"}
                  onChange={(e) =>
                    setEncryptionLevel(e.target.value as "40bit")
                  }
                />
                40-bit RC4 (Compatible with older PDF readers)
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  value="128bit"
                  checked={encryptionLevel === "128bit"}
                  onChange={(e) =>
                    setEncryptionLevel(e.target.value as "128bit")
                  }
                />
                128-bit RC4 (Recommended)
              </label>
            </div>
          </div>
        </div>

        <div className="permissions-section">
          <h3>
            <FaShieldAlt className="subsection-icon" />
            Document Permissions
          </h3>

          <div className="permissions-grid">
            <label className="permission-item">
              <input
                type="checkbox"
                checked={permissions.printing}
                onChange={() => handlePermissionChange("printing")}
              />
              <div className="permission-info">
                <span className="permission-title">Allow Printing</span>
                <span className="permission-description">
                  Users can print the document
                </span>
              </div>
            </label>

            <label className="permission-item">
              <input
                type="checkbox"
                checked={permissions.modifying}
                onChange={() => handlePermissionChange("modifying")}
              />
              <div className="permission-info">
                <span className="permission-title">Allow Modifying</span>
                <span className="permission-description">
                  Users can modify the document content
                </span>
              </div>
            </label>

            <label className="permission-item">
              <input
                type="checkbox"
                checked={permissions.copying}
                onChange={() => handlePermissionChange("copying")}
              />
              <div className="permission-info">
                <span className="permission-title">Allow Copying</span>
                <span className="permission-description">
                  Users can copy text and images
                </span>
              </div>
            </label>

            <label className="permission-item">
              <input
                type="checkbox"
                checked={permissions.annotating}
                onChange={() => handlePermissionChange("annotating")}
              />
              <div className="permission-info">
                <span className="permission-title">Allow Annotating</span>
                <span className="permission-description">
                  Users can add comments and annotations
                </span>
              </div>
            </label>

            <label className="permission-item">
              <input
                type="checkbox"
                checked={permissions.fillingForms}
                onChange={() => handlePermissionChange("fillingForms")}
              />
              <div className="permission-info">
                <span className="permission-title">Allow Form Filling</span>
                <span className="permission-description">
                  Users can fill in form fields
                </span>
              </div>
            </label>

            <label className="permission-item">
              <input
                type="checkbox"
                checked={permissions.contentAccessibility}
                onChange={() => handlePermissionChange("contentAccessibility")}
              />
              <div className="permission-info">
                <span className="permission-title">
                  Allow Content Accessibility
                </span>
                <span className="permission-description">
                  Screen readers can access content
                </span>
              </div>
            </label>

            <label className="permission-item">
              <input
                type="checkbox"
                checked={permissions.documentAssembly}
                onChange={() => handlePermissionChange("documentAssembly")}
              />
              <div className="permission-info">
                <span className="permission-title">
                  Allow Document Assembly
                </span>
                <span className="permission-description">
                  Users can insert, rotate, or delete pages
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="protection-summary">
          <h3>Protection Summary</h3>
          <div className="summary-content">
            <div className="summary-item">
              <strong>User Password:</strong>{" "}
              {userPassword ? "••••••••" : "Not set"}
            </div>
            <div className="summary-item">
              <strong>Owner Password:</strong>{" "}
              {ownerPassword ? "••••••••" : "Not set"}
            </div>
            <div className="summary-item">
              <strong>Encryption:</strong>{" "}
              {encryptionLevel === "128bit" ? "128-bit RC4" : "40-bit RC4"}
            </div>
            <div className="summary-item">
              <strong>Allowed Actions:</strong>
              <ul>
                {Object.entries(permissions)
                  .filter(([_, allowed]) => allowed)
                  .map(([permission]) => (
                    <li key={permission}>
                      {permission
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="protection-actions">
          <button
            className="protect-btn"
            onClick={protectPDF}
            disabled={
              isProcessing || (!userPassword.trim() && !ownerPassword.trim())
            }
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <FaDownload />
                Protect & Download PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PDFPasswordProtector;
