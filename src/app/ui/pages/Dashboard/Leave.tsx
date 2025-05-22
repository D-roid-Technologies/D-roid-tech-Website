import React, { useState } from 'react'
import { Assets } from '../../../utils/constant/Assets';

const Leave: React.FunctionComponent = () => {
    const [formData, setFormData] = useState({

    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function timeSinceAccountCreation(creationDateStr: string): { months: number, days: number, hours: number } {
        const creationDate = new Date(creationDateStr.replace(' ', 'T')); // Ensure ISO format
        const now = new Date();

        // Total difference in milliseconds
        const diffMs = now.getTime() - creationDate.getTime();

        if (diffMs < 0) {
            throw new Error("Creation date is in the future.");
        }

        // Constants
        const MS_PER_HOUR = 1000 * 60 * 60;
        const MS_PER_DAY = MS_PER_HOUR * 24;
        const MS_PER_MONTH = MS_PER_DAY * 30.44; // average month length

        const totalMonths = Math.floor(diffMs / MS_PER_MONTH);
        const remainingMsAfterMonths = diffMs % MS_PER_MONTH;

        const totalDays = Math.floor(remainingMsAfterMonths / MS_PER_DAY);
        const remainingMsAfterDays = remainingMsAfterMonths % MS_PER_DAY;

        const totalHours = Math.floor(remainingMsAfterDays / MS_PER_HOUR);

        return {
            months: totalMonths,
            days: totalDays,
            hours: totalHours
        };
    }

    const result = timeSinceAccountCreation("2025-05-18 12:02:14");

    const leaveAvailability = (months: number): JSX.Element => {
        if (months > 6 && months < 12) {
            return <p style={{ color: "#000000", marginBottom: 20 }}>You have 6 days of Leave available.</p>;
        } else if (months >= 12) {
            return <p style={{ color: "#000000", marginBottom: 20 }}>You have 22 days of Leave available.</p>;
        } else {
            return <p style={{ color: "#000000", marginBottom: 20 }}>You have 0 days of Leave available.</p>;
        }
    };
    return (
        <div>
            <p style={{ color: "#000000", marginBottom: 10 }}>You have been a staff of {Assets.text.companyName} for {result.months} Months, {result.days} Days and {result.hours} Hours</p>
            {leaveAvailability(result.months)}
            {['StartDay', 'EndDay', 'Month', 'Year'].map((field) => (
                <input
                    key={field}
                    name={field}
                    type="text"
                    placeholder={field.replace(/([A-Z])/g, ' $1')}
                    value={(formData as any)[field] || ''}
                    onChange={handleInputChange}
                    disabled={result.months < 6}
                    style={{
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #D1D5DB',
                        width: '100%',
                        marginBottom: '0.75rem',
                        fontSize: '0.875rem',
                        backgroundColor: result.months < 6 ? '#F3F4F6' : '#FFFFFF', // Optional: grey out if disabled
                        cursor: result.months < 6 ? 'not-allowed' : 'text', // Optional: visual feedback
                    }}
                />
            ))}
            <button
                // onClick={() => window.open(`${descriptionUrl}`, '_blank')}
                style={{
                    backgroundColor: result.months < 6 ? '#F3F4F6' : '#071D6A',
                    color: result.months < 6 ? '#071D6A' : '#F3F4F6'
                }}
                disabled={result.months < 6}
            >
                Apply for Leave
            </button>
        </div>
    )
}

export default Leave