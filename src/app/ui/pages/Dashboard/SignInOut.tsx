import React, { useState } from 'react';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { authService } from '../../../redux/configuration/auth.service';

type Entry = {
    email: string;
    employeeId?: string;
    timestamp: string;
    type: 'Sign In' | 'Sign Out';
};

const SignInOut: React.FC = () => {
    const [email, setEmail] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const loggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const userEmail = useSelector((state: RootState) => state.user.email);
    const userID = useSelector((state: RootState) => state.user.uniqueId);
    const firstName = useSelector((state: RootState) => state.user.firstName);
    const lastName = useSelector((state: RootState) => state.user.lastName);
    const [isSigningIn, setIsSigningIn] = useState(loggedIn);

    const SERVICE_ID = 'service_o1jbklr';
    const TEMPLATE_ID = 'template_p8h58ur';
    const PUBLIC_KEY = 'hcj3DsJ8MfNfUrE8J';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate credentials
        if (email !== userEmail || employeeId !== userID) {
            toast.error('Email or ID does not match your account.', {
                style: { background: '#ff4d4f', color: '#fff' },
            });
            return;
        }

        const entry: Entry = {
            email,
            employeeId,
            timestamp: new Date().toLocaleString(),
            type: isSigningIn ? 'Sign In' : 'Sign Out',
        };

        try {
            // 🔁 Update Firestore
            await authService.logStaffSignInOut(entry).then(() => {
                //✅ Send notification email
                const templateParams = {
                    name: `${firstName} ${lastName}`,
                    title: `This is to notify you that you have ${entry.type} on your D'roid One Account.

                If you didn't do this, kindly change your password`,
                    email: userEmail,
                };

                emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).then(
                    () => {
                        toast.success('Email successfully sent!', {
                            style: { background: '#4BB543', color: '#fff' },
                        });
                    },
                    () => {
                        toast.error('Error sending email 🚫', {
                            style: { background: '#ff4d4f', color: '#fff' },
                        });
                    }
                );

                //🔄 Reset form
                setEmail('');
                setEmployeeId('');
                // console.log('Log Entry:', entry);
            })
        } catch (error) {
            console.error('Failed to log entry or send email:', error);
            toast.error('Failed to record sign-in/out.', {
                style: { background: '#ff4d4f', color: '#fff' },
            });
        }
    };


    return (
        <div style={styles.container}>
            <h2 style={{ ...styles.header, color: '#000000' }}>
                🕒 Staff {isSigningIn ? 'Sign In' : 'Sign Out'}
            </h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    style={styles.input}
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    style={styles.input}
                    placeholder="Employee ID"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                />
                <div style={styles.toggle}>
                    <label style={{ color: '#000000' }}>
                        <input
                            type="radio"
                            checked={isSigningIn}
                            onChange={() => setIsSigningIn(true)}
                        />{' '}
                        Sign In
                    </label>
                    <label style={{ color: '#000000' }}>
                        <input
                            type="radio"
                            checked={!isSigningIn}
                            onChange={() => setIsSigningIn(false)}
                        />{' '}
                        Sign Out
                    </label>
                </div>
                <button type="submit" style={styles.button}>
                    Submit
                </button>
            </form>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '14px',
    },
    toggle: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '1rem',
    },
    button: {
        padding: '12px',
        backgroundColor: '#111827',
        color: '#fff',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
};

export default SignInOut;
