import React from 'react';

interface Subject {
    name: string;
    code: string;
}

interface Props {
    data: Subject[];
    onChange: (updated: Subject[]) => void;
    onNext: () => void;
}

const inputStyle: React.CSSProperties = {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    marginBottom: '10px',
};

const labelStyle: React.CSSProperties = {
    fontWeight: 600,
    fontSize: '14px',
    marginBottom: '6px',
    color: '#333',
};

const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#071D6A',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '10px',
};

const SubjectsStep: React.FC<Props> = ({ data, onChange, onNext }) => {
    const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
        const updated = [...data];
        updated[index][field] = value;
        onChange(updated);
    };

    const handleAddSubject = () => {
        onChange([...data, { name: '', code: '' }]);
    };

    const handleRemoveSubject = (index: number) => {
        const updated = data.filter((_, i) => i !== index);
        onChange(updated);
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
                Step 2: Add Subjects
            </h2>

            {data.map((subject, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: '20px',
                        padding: '16px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '10px',
                        backgroundColor: '#fafafa',
                    }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={labelStyle}>Subject Name</label>
                            <input
                                type="text"
                                value={subject.name}
                                onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <label style={labelStyle}>Subject Code</label>
                            <input
                                type="text"
                                value={subject.code}
                                onChange={(e) => handleSubjectChange(index, 'code', e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                        {data.length > 1 && (
                            <button
                                type="button"
                                onClick={() => handleRemoveSubject(index)}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: '#e53935',
                                    marginLeft: '10px',
                                }}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
            ))}

            <div style={{ marginTop: '10px' }}>
                <button
                    type="button"
                    onClick={handleAddSubject}
                    style={{
                        ...buttonStyle,
                        backgroundColor: '#0E4C92',
                    }}
                >
                    + Add Subject
                </button>
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

export default SubjectsStep;