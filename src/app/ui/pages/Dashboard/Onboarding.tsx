import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { UserType } from '../../../utils/Types';
import DocumentUploadUI from './DocumentUploadUI';
import PreferencesUI from './PreferencesUI';

const onboardingSteps = ['Personal Info', 'Bank Info', 'Documents', 'Preferences'];

const Onboarding: React.FC = () => {
  const userDetails = useSelector((state: RootState) => state.user);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserType | null>(null);

  useEffect(() => {
    setFormData({ ...userDetails });
  }, [userDetails]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!formData) return;
    setFormData({ ...formData, [name]: value });
  };

  const renderStep = () => {
    if (!formData) return null;

    switch (currentStep) {
      case 0:
        return (
          <>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Personal Information</h2>
            {['firstName', 'lastName', 'middleName', 'phone', 'gender', 'dateOfBirth', 'streetNumber', 'streetName', 'city', 'state', 'country'].map((field) => (
              <input
                key={field}
                name={field}
                type="text"
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={(formData as any)[field] || ''}
                onChange={handleInputChange}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #D1D5DB',
                  width: '100%',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                }}
              />
            ))}
            <select
              name="educationalLevel"
              value={formData.educationalLevel || ''}
              onChange={handleInputChange}
              style={{
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #D1D5DB',
                width: '100%',
                marginBottom: '0.75rem',
                fontSize: '0.875rem',
              }}
            >
              <option value="">Select Educational Level</option>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </>
        );

      case 1:
        return (
          <>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem' }}>Bank Information</h2>
            {['bankName', 'accountNumber', 'accountName'].map((field) => (
              <input
                key={field}
                name={field}
                type="text"
                placeholder={field.replace(/([A-Z])/g, ' $1')}
                value={(formData as any)[field] || ''}
                onChange={handleInputChange}
                style={{
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #D1D5DB',
                  width: '100%',
                  marginBottom: '0.75rem',
                  fontSize: '0.875rem',
                }}
              />
            ))}
          </>
        );

      case 2:
        return <DocumentUploadUI />;

      case 3:
        return <PreferencesUI user={formData} onChange={setFormData} />;

      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (!formData) return;
    console.log('Submitting form:', formData);
    // Submit logic here
  };

  return (
    <div
      style={{
        maxWidth: '48rem',
        margin: '2rem auto',
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Staff Onboarding</h1>
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>
          Step {currentStep + 1} of {onboardingSteps.length}
        </span>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', fontWeight: 500, marginBottom: '1rem' }}>
          {onboardingSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                backgroundColor: currentStep === index ? '#1D4ED8' : '#E5E7EB',
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

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#D1D5DB',
            color: '#374151',
            borderRadius: '0.5rem',
            border: 'none',
            opacity: currentStep === 0 ? 0.5 : 1,
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          Back
        </button>
        {currentStep === onboardingSteps.length - 1 ? (
          <button
            onClick={handleSubmit}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#16A34A',
              color: '#FFFFFF',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={handleNext}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
