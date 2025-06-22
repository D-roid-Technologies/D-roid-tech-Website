import React, { useState } from 'react';

const CreateClassForm = () => {
    const [formData, setFormData] = useState({
        className: '',
        classCode: '',
        level: '',
        subject: '',
        teacher: '',
        schedule: '',
        room: '',
        capacity: '',
        term: '',
        academicYear: '',
        department: '',
        mode: '',
        description: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted Class Data:', formData);
        // Handle backend/API submission here
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px',
        marginBottom: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px',
    };

    const labelStyle: React.CSSProperties = {
        fontWeight: 500,
        marginBottom: '4px',
        display: 'block',
        color: '#333',
    };

    const formGroupStyle: React.CSSProperties = {
        marginBottom: '16px',
    };

    return (
        <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '20px', color: '#071D6A' }}>Create New Class</h2>
            <form onSubmit={handleSubmit}>
                {[
                    { label: 'Class Name', name: 'className', type: 'text' },
                    { label: 'Class Code', name: 'classCode', type: 'text' },
                    { label: 'Level (Grade/Year)', name: 'level', type: 'text' },
                    { label: 'Subject', name: 'subject', type: 'text' },
                    { label: 'Assigned Teacher', name: 'teacher', type: 'text' },
                    { label: 'Schedule', name: 'schedule', type: 'datetime-local' },
                    { label: 'Room Number', name: 'room', type: 'text' },
                    { label: 'Capacity', name: 'capacity', type: 'number' },
                    { label: 'Academic Term', name: 'term', type: 'text' },
                    { label: 'Academic Year', name: 'academicYear', type: 'text' },
                    { label: 'Department', name: 'department', type: 'text' },
                ].map(field => (
                    <div key={field.name} style={formGroupStyle}>
                        <label style={labelStyle}>{field.label}</label>
                        <input
                            style={inputStyle}
                            type={field.type}
                            name={field.name}
                            value={(formData as any)[field.name]}
                            onChange={handleChange}
                            required={field.name !== 'department'} // Example condition
                        />
                    </div>
                ))}

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Mode of Learning</label>
                    <select
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        style={inputStyle}
                    >
                        <option value="">Select Mode</option>
                        <option value="online">Online</option>
                        <option value="in-person">In-person</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Class Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Optional description or notes"
                        style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '12px 20px',
                        backgroundColor: '#071D6A',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#05205C')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#071D6A')}
                >
                    Create Class
                </button>
            </form>
        </div>
    );
};

export default CreateClassForm;