import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' }
];

const CustomSelect = ({ formData, setFormData, renderErrorMessage }) => {
  const selectedOption = options.find(
    (option) => option.value === formData.isCompanyRegistered
  );

  const handleChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      isCompanyRegistered: selected.value,
    }));
  };

  const getLabelStyle = () => ({
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  });

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={getLabelStyle()}>Is Company Registered? *</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select Registration Status"
        styles={{
          control: (base) => ({
            ...base,
            borderColor: '#ccc',
            borderRadius: '6px',
            padding: '2px',
            fontSize: '16px',
          }),
        }}
      />
      {renderErrorMessage('isCompanyRegistered')}
    </div>
  );
};

export default CustomSelect;
