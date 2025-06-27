import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { authService } from '../../../redux/configuration/auth.service';
import { StaffDetails } from '../../../redux/slices/SignInAndOutSlice';
import { RootState } from '../../../redux/Store';
import { UserType } from '../../../utils/Types';
import DocumentUploadUI from './DocumentUploadUI';
import Leave from './Leave';
import './Onboarding.css'; // Assuming you have a CSS file for styles

const onboardingSteps = ['View Info', 'Personal Info', 'Documents', 'Leave'];

const Onboarding: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.user);
  const staffDetails = useSelector((state: RootState) => state.SignInO.staffDetails);

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserType | null>(null);
  const [formDataNew, setFormDataNew] = useState<Partial<StaffDetails>>({});

  useEffect(() => {
    setFormData({ ...userDetails });
    setFormDataNew({ ...staffDetails });
  }, [userDetails, staffDetails]);

  const handleStaffDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataNew(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 style={headingStyle}>View Personal Information</h2>
            <InfoField label="Your Position" value={staffDetails.staffPosition} />
            <InfoField label="Your Monthly Gross Pay" value={staffDetails.staffGrossPay} />
            <InfoField label="Your Monthly Tax" value={staffDetails.staffTax} />
          </>
        );
      case 1:
        return (
          <>
            <h2 style={headingStyle}>Update Personal Information</h2>
            {[
              { label: 'Bank Name', name: 'staffBank' },
              { label: 'Account Number', name: 'staffAccountNmber' },
              { label: 'Account Name', name: 'staffAccountName' },
              { label: 'Gross Pay', name: 'staffGrossPay' },
              { label: 'Tax Deduction', name: 'staffTax' },
              { label: 'Staff Position', name: 'staffPosition' },
            ].map(({ label, name }) => (
              <input
                key={name}
                name={name}
                type="text"
                placeholder={label}
                value={formDataNew[name as keyof StaffDetails] || ''}
                onChange={handleStaffDetailsChange}
                style={inputStyle}
              />
            ))}
            <button onClick={handleSubmit} style={submitButtonStyle}>
              Save Personal Info
            </button>
          </>
        );
      case 2:
        return <DocumentUploadUI />;
      case 3:
        return (
          <>
            <h2 style={headingStyle}>Leave Information</h2>
            <Leave />
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authService.updateStaffOnboardingDetails(formDataNew);
  }

  //   try {
  //     // Call the service with a partial update

  //   } catch (error) {
  //     console.error("Submission failed:", error);
  //   }
  // };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <span style={{ color: "#6B7280" }}>Complete your onboarding tasks.</span>
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
          Step {currentStep + 1} of {onboardingSteps.length}
        </span>
      </div>

      <div>
        <div className='stepsStyle'>
          {onboardingSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              style={{
                padding: '12px',
                borderRadius: '9999px',
                backgroundColor: currentStep === index ? '#071D6A' : '#E5E7EB',
                color: currentStep === index ? '#FFFFFF' : '#4B5563',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {step}
            </button>
          ))}
        </div>
        {renderStep()}
      </div>
    </div>
  );
};

export default Onboarding;

// --- Styled Components / Reusable Styles ---
const headingStyle = {
  fontSize: '1.125rem',
  fontWeight: 600,
  marginBottom: '1rem',
  color: "#000000",
};

const inputStyle = {
  padding: '0.75rem',
  borderRadius: '0.5rem',
  border: '1px solid #D1D5DB',
  width: '100%',
  marginBottom: '0.75rem',
  fontSize: '0.875rem',
};

const submitButtonStyle = {
  marginTop: "20px",
  padding: "12px",
  backgroundColor: "#071D6A",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  cursor: "pointer",
};

const containerStyle = {
  maxWidth: '48rem',
  margin: '2rem auto',
  padding: '1.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '0.75rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1.5rem',
};


const InfoField = ({ label, value }: { label: string; value: string }) => (
  <p style={{
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid #D1D5DB',
    width: '100%',
    marginBottom: '0.75rem',
    fontSize: '0.875rem',
    color: "#000000"
  }}>
    {label}: {value}
  </p>
);