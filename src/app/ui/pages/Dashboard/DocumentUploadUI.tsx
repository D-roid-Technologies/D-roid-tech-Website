import React, { useState } from "react";

const initialState = {
    nationalId: null,
    proofOfAddress: null,
    educationCert: null,
    resume: null,
    medicalDoc: null,
    signature: null,
};

const DocumentUploadUI: React.FC = () => {
    const [documents, setDocuments] = useState<{ [key: string]: File | null }>(initialState);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const file = e.target.files?.[0] || null;
        setDocuments({ ...documents, [name]: file });
    };

    const handleUpload = async () => {
        try {
            for (const [key, file] of Object.entries(documents)) {
                if (file) {
                    const storageRef = `users/uploads/${key}/${file.name}`; // Firebase storage path
                    // Upload logic here (e.g., uploadBytes in Firebase)
                    console.log(`Uploading ${file.name} to ${storageRef}`);
                }
            }
            alert("Documents uploaded successfully.");
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const fileFields = [
        { label: "National ID", name: "nationalId" },
        { label: "Proof of Address", name: "proofOfAddress" },
        { label: "Education Certificate", name: "educationCert" },
        { label: "Resume / CV", name: "resume" },
        { label: "Medical Documentation", name: "medicalDoc" },
        { label: "Signature", name: "signature" },
    ];

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ color: "#000000" }}>Upload Required Documents</h2>
            <p style={{ fontSize: "14px", color: "#555" }}>
                These documents will be stored securely - be rest assured your personal documents are in safe hands.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                {fileFields.map(field => (
                    <div key={field.name}>
                        <label style={{ color: "#000000", marginBottom: 10 }}>{field.label}</label><br />
                        <input
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png"
                            onChange={(e) => handleFileChange(e, field.name)}
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid #ccc',
                                backgroundColor: '#f0f0f0',
                                fontSize: '14px',
                                color: "#000000",
                            }}
                        />
                    </div>
                ))}
                <button
                    onClick={handleUpload}
                    style={{
                        marginTop: "20px",
                        padding: "12px",
                        backgroundColor: "#071D6A",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Upload Documents
                </button>
            </div>
        </div>
    );
};

export default DocumentUploadUI;