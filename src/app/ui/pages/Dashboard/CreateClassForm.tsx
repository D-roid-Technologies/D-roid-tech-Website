import React, { useState } from 'react';

type Subject = {
    name: string;
    code: string;
    description: string;
};

const CreateClassForm: React.FC = () => {
    const [step, setStep] = useState(1);

    const [classData, setClassData] = useState({
        classDetails: {
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
        },
        subjects: [
            {
                name: '',
                code: '',
                description: '',
            },
        ],
        students: [
            {
                id: '',
                name: '',
                email: '',
                enrollmentStatus: '',
            },
        ],
        subjectTeachers: {
            Math: [
                {
                    name: '',
                    email: '',
                },
            ],
        },
        timetable: [
            {
                day: '',
                subject: '',
                startTime: '',
                endTime: '',
                room: '',
            },
        ],
        exams: {
            internal: [
                {
                    title: '',
                    date: '',
                    maxMarks: '',
                    subject: '',
                },
            ],
            external: [
                {
                    title: '',
                    date: '',
                    maxMarks: '',
                    subject: '',
                },
            ],
        },
    });

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    const updateClassDetails = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setClassData((prev) => ({
            ...prev,
            classDetails: { ...prev.classDetails, [name]: value },
        }));
    };

    const updateSubjectField = (
        index: number,
        field: keyof Subject,
        value: string
    ) => {
        const newSubjects = [...classData.subjects];
        newSubjects[index][field] = value;
        setClassData((prev) => ({ ...prev, subjects: newSubjects }));
    };

    const addSubject = () => {
        setClassData((prev) => ({
            ...prev,
            subjects: [...prev.subjects, { name: '', code: '', description: '' }],
        }));
    };

    const removeSubject = (index: number) => {
        const newSubjects = classData.subjects.filter((_, i) => i !== index);
        setClassData((prev) => ({ ...prev, subjects: newSubjects }));
    };

    const handleFinalSubmit = () => {
        console.log('Submitting full class:', classData);
        // TODO: send classData to backend API
    };

    return (
        <div
            style={{
                maxWidth: 900,
                margin: '40px auto',
                padding: 40,
                backgroundColor: '#f9fafb',
                borderRadius: 16,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
        >
            <h2
                style={{
                    fontSize: 28,
                    fontWeight: 700,
                    marginBottom: 40,
                    color: '#0f172a',
                    textAlign: 'center',
                    letterSpacing: '0.03em',
                }}
            >
                Create New Class – Step {step}
            </h2>

            {/* Step 1: Class Details */}
            {step === 1 && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        nextStep();
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
                >
                    {Object.entries(classData.classDetails).map(([key, value]) => {
                        const isTextarea = key === 'description';
                        const isSelect = key === 'mode';
                        const type =
                            key === 'capacity'
                                ? 'number'
                                : key === 'schedule'
                                    ? 'datetime-local'
                                    : 'text';

                        const label = key
                            .replace(/([A-Z])/g, ' $1')
                            .replace(/^./, (str) => str.toUpperCase());

                        if (isSelect) {
                            return (
                                <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label
                                        htmlFor={key}
                                        style={{
                                            fontWeight: 600,
                                            marginBottom: 6,
                                            color: '#334155',
                                            fontSize: 14,
                                        }}
                                    >
                                        {label}
                                    </label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={value}
                                        onChange={updateClassDetails}
                                        required
                                        style={{
                                            padding: '10px 14px',
                                            fontSize: 15,
                                            borderRadius: 8,
                                            border: '1.5px solid #cbd5e1',
                                            backgroundColor: '#fff',
                                            transition: 'border-color 0.3s ease',
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                                        onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                                    >
                                        <option value="">Select Mode</option>
                                        <option value="online">Online</option>
                                        <option value="in-person">In-person</option>
                                        <option value="hybrid">Hybrid</option>
                                    </select>
                                </div>
                            );
                        }

                        if (isTextarea) {
                            return (
                                <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label
                                        htmlFor={key}
                                        style={{
                                            fontWeight: 600,
                                            marginBottom: 6,
                                            color: '#334155',
                                            fontSize: 14,
                                        }}
                                    >
                                        {label}
                                    </label>
                                    <textarea
                                        id={key}
                                        name={key}
                                        value={value}
                                        onChange={updateClassDetails}
                                        rows={5}
                                        placeholder="Optional description or notes"
                                        style={{
                                            padding: 12,
                                            fontSize: 15,
                                            borderRadius: 8,
                                            border: '1.5px solid #cbd5e1',
                                            resize: 'vertical',
                                            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                            transition: 'border-color 0.3s ease',
                                        }}
                                        onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                                        onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                                    />
                                </div>
                            );
                        }

                        return (
                            <div key={key} style={{ display: 'flex', flexDirection: 'column' }}>
                                <label
                                    htmlFor={key}
                                    style={{
                                        fontWeight: 600,
                                        marginBottom: 6,
                                        color: '#334155',
                                        fontSize: 14,
                                    }}
                                >
                                    {label}
                                </label>
                                <input
                                    id={key}
                                    type={type}
                                    name={key}
                                    value={value}
                                    onChange={updateClassDetails}
                                    required={key !== 'description' && key !== 'department'}
                                    placeholder={`Enter ${label.toLowerCase()}`}
                                    style={{
                                        padding: '10px 14px',
                                        fontSize: 15,
                                        borderRadius: 8,
                                        border: '1.5px solid #cbd5e1',
                                        transition: 'border-color 0.3s ease',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                                />
                            </div>
                        );
                    })}

                    <button
                        type="submit"
                        style={{
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: 10,
                            fontWeight: 600,
                            fontSize: 16,
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                    >
                        Next
                    </button>
                </form>
            )}

            {/* Step 2: Subjects */}
            {step === 2 && (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        nextStep();
                    }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 30 }}
                >
                    {classData.subjects.map((subject, index) => (
                        <div
                            key={index}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: 12,
                                padding: 20,
                                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div style={{ marginBottom: 15 }}>
                                <label
                                    htmlFor={`subject-name-${index}`}
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 14,
                                        color: '#475569',
                                        display: 'block',
                                        marginBottom: 6,
                                    }}
                                >
                                    Subject Name
                                </label>
                                <input
                                    id={`subject-name-${index}`}
                                    type="text"
                                    value={subject.name}
                                    onChange={(e) =>
                                        updateSubjectField(index, 'name', e.target.value)
                                    }
                                    required
                                    placeholder="Enter subject name"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: 8,
                                        border: '1.5px solid #cbd5e1',
                                        fontSize: 15,
                                        transition: 'border-color 0.3s ease',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                                />
                            </div>

                            <div style={{ marginBottom: 15 }}>
                                <label
                                    htmlFor={`subject-code-${index}`}
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 14,
                                        color: '#475569',
                                        display: 'block',
                                        marginBottom: 6,
                                    }}
                                >
                                    Subject Code
                                </label>
                                <input
                                    id={`subject-code-${index}`}
                                    type="text"
                                    value={subject.code}
                                    onChange={(e) =>
                                        updateSubjectField(index, 'code', e.target.value)
                                    }
                                    required
                                    placeholder="Enter subject code"
                                    style={{
                                        width: '100%',
                                        padding: '10px 14px',
                                        borderRadius: 8,
                                        border: '1.5px solid #cbd5e1',
                                        fontSize: 15,
                                        transition: 'border-color 0.3s ease',
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                                />
                            </div>

                            <div style={{ marginBottom: 15 }}>
                                <label
                                    htmlFor={`subject-desc-${index}`}
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 14,
                                        color: '#475569',
                                        display: 'block',
                                        marginBottom: 6,
                                    }}
                                >
                                    Description
                                </label>
                                <textarea
                                    id={`subject-desc-${index}`}
                                    value={subject.description}
                                    onChange={(e) =>
                                        updateSubjectField(index, 'description', e.target.value)
                                    }
                                    placeholder="Optional description"
                                    rows={3}
                                    style={{
                                        width: '100%',
                                        padding: 12,
                                        borderRadius: 8,
                                        border: '1.5px solid #cbd5e1',
                                        fontSize: 15,
                                        resize: 'vertical',
                                        transition: 'border-color 0.3s ease',
                                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = '#2563eb')}
                                    onBlur={(e) => (e.target.style.borderColor = '#cbd5e1')}
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => removeSubject(index)}
                                style={{
                                    backgroundColor: '#ef4444',
                                    color: '#fff',
                                    padding: '8px 16px',
                                    border: 'none',
                                    borderRadius: 8,
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ef4444')}
                            >
                                Remove Subject
                            </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addSubject}
                        style={{
                            backgroundColor: '#2563eb',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: 10,
                            fontWeight: 600,
                            fontSize: 16,
                            border: 'none',
                            cursor: 'pointer',
                            alignSelf: 'start',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                    >
                        Add Subject
                    </button>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            type="button"
                            onClick={prevStep}
                            style={{
                                backgroundColor: '#64748b',
                                color: '#fff',
                                padding: '12px 24px',
                                borderRadius: 10,
                                fontWeight: 600,
                                fontSize: 16,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#475569')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#64748b')}
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: '#2563eb',
                                color: '#fff',
                                padding: '12px 24px',
                                borderRadius: 10,
                                fontWeight: 600,
                                fontSize: 16,
                                border: 'none',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1e40af')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563eb')}
                        >
                            Next
                        </button>
                    </div>
                </form>
            )}

            {/* For demo, final submit button after step 2 */}
            {step > 2 && (
                <div style={{ textAlign: 'center', marginTop: 40 }}>
                    <button
                        onClick={prevStep}
                        style={{
                            backgroundColor: '#64748b',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: 10,
                            fontWeight: 600,
                            fontSize: 16,
                            border: 'none',
                            cursor: 'pointer',
                            marginRight: 20,
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#475569')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#64748b')}
                    >
                        Back
                    </button>
                    <button
                        onClick={handleFinalSubmit}
                        style={{
                            backgroundColor: '#16a34a',
                            color: '#fff',
                            padding: '12px 24px',
                            borderRadius: 10,
                            fontWeight: 600,
                            fontSize: 16,
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803d')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16a34a')}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default CreateClassForm;