import React from 'react';

interface ClassDetails {
    className: string;
    classCode: string;
    level: string;
    term: string;
    academicYear: string;
    department: string;
    mode: string;
    description: string;
}

interface Props {
    data: ClassDetails;
    onChange: (updated: ClassDetails) => void;
    onNext: () => void;
}

const inputStyle: React.CSSProperties = {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
};

const formGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
};

const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '6px',
    color: '#333',
};

const buttonStyle: React.CSSProperties = {
    padding: '14px 28px',
    backgroundColor: '#071D6A',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
};

const ClassDetailsStep: React.FC<Props> = ({ data, onChange, onNext }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        onChange({ ...data, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: '800px',
                margin: '40px auto',
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
                fontFamily: 'Arial, sans-serif',
            }}
        >
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '30px', color: '#071D6A', textAlign: 'center' }}>
                Step 1: Class Details
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {[
                    { label: 'Class Name', name: 'className' },
                    { label: 'Class Code', name: 'classCode' },
                    { label: 'Level', name: 'level' },
                    { label: 'Term', name: 'term' },
                    { label: 'Academic Year', name: 'academicYear' },
                    { label: 'Department', name: 'department' },
                ].map((field) => (
                    <div key={field.name} style={formGroupStyle}>
                        <label htmlFor={field.name} style={labelStyle}>
                            {field.label}
                        </label>
                        <input
                            style={inputStyle}
                            type="text"
                            name={field.name}
                            value={(data as any)[field.name]}
                            onChange={handleChange}
                            onFocus={(e) => (e.currentTarget.style.borderColor = '#071D6A')}
                            onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
                            required
                        />
                    </div>
                ))}

                <div style={formGroupStyle}>
                    <label htmlFor="mode" style={labelStyle}>
                        Mode of Learning
                    </label>
                    <select
                        name="mode"
                        value={data.mode}
                        onChange={handleChange}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#071D6A')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
                        required
                    >
                        <option value="">Select Mode</option>
                        <option value="online">Online</option>
                        <option value="in-person">In-person</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div style={{ ...formGroupStyle, gridColumn: '1 / -1' }}>
                    <label htmlFor="description" style={labelStyle}>
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                        placeholder="Optional class description"
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = '#071D6A')}
                        onBlur={(e) => (e.currentTarget.style.borderColor = '#ccc')}
                    />
                </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#05205C')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#071D6A')}
                >
                    Next
                </button>
            </div>
        </form>
    );
};

export default ClassDetailsStep;