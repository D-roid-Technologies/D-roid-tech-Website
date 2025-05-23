import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { authService, getUserDocByUniqueId } from '../../../redux/configuration/auth.service';
import { format, parseISO, parse } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Entry } from '../../../redux/slices/SignInAndOutSlice';


const SignInOut: React.FC = () => {
    const [email, setEmail] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [logs, setLogs] = useState<Entry[]>([]);
    const [isSigningIn, setIsSigningIn] = useState(true);

    const user = useSelector((state: RootState) => state.user);
    const userLogs = useSelector((state: RootState) => state.SignInO.entries as Entry[]);
    console.log(userLogs)

    useEffect(() => {
        setEmail(user.email);
        setEmployeeId(user.uniqueId);
        setIsSigningIn(!getLastStatus());
        setLogs(userLogs); // Use redux logs
    }, [user.email, user.uniqueId, userLogs]);

    const getLastStatus = () => {
        if (logs.length === 0) return false;
        const lastEntry = logs[logs.length - 1];
        return lastEntry.type === 'Sign In';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (email !== user.email || employeeId !== user.uniqueId) {
            toast.error('Email or ID does not match your account.');
            return;
        }

        const entry: Entry = {
            email,
            employeeId,
            timestamp: new Date().toLocaleString(),
            type: isSigningIn ? 'Sign In' : 'Sign Out',
        };

        try {
            await authService.logStaffSignInOut(entry);
            setLogs((prev) => [...prev, entry]);

            const templateParams = {
                name: `${user.firstName} ${user.lastName}`,
                title: `You have ${entry.type} on your D'roid One Account on ${entry.timestamp}`,
                email: user.email,
            };

            emailjs.send('service_o1jbklr', 'template_p8h58ur', templateParams, 'hcj3DsJ8MfNfUrE8J');
            toast.success(`${entry.type} recorded!`);
        } catch (error) {
            toast.error('Failed to record sign-in/out.');
        }
    };

    const getWorkedHoursData = () => {
        const dailyData: { [key: string]: number } = {};
        const formatString = 'dd/MM/yyyy, HH:mm:ss';

        for (let i = 0; i < logs.length - 1; i += 2) {
            const inTimestamp = logs[i].timestamp;
            const outTimestamp = logs[i + 1]?.timestamp;

            const inTime = inTimestamp.includes('T')
                ? parseISO(inTimestamp)
                : parse(inTimestamp, formatString, new Date());

            const outTime = outTimestamp.includes('T')
                ? parseISO(outTimestamp)
                : parse(outTimestamp, formatString, new Date());

            if (isNaN(inTime.getTime()) || isNaN(outTime.getTime())) {
                // Skip invalid dates
                continue;
            }

            const hours = (outTime.getTime() - inTime.getTime()) / (1000 * 60 * 60);
            const date = format(inTime, 'yyyy-MM-dd');
            dailyData[date] = (dailyData[date] || 0) + hours;
        }

        return Object.entries(dailyData).map(([date, hours]) => ({ date, hours }));
    };


    return (
        <div style={styles.container}>
            <h2 style={styles.header}>
                {getLastStatus() ? '🟢 Signed In' : '🔴 Signed Out'}
            </h2>

            {/* Side-by-side layout */}
            <div style={styles.flexContainer}>
                {/* Form */}
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
                        <label style={{ color: "#000000" }}>
                            <input
                                type="radio"
                                checked={isSigningIn}
                                onChange={() => setIsSigningIn(true)}
                            />{' '}
                            Sign In
                        </label>
                        <label style={{ color: "#000000" }}>
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

                {/* Chart */}
                <div style={styles.chartContainer}>
                    <h3 style={{ color: "#000000" }}>Hours Worked</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={getWorkedHoursData()}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="hours" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Table for Logs */}
            <div style={styles.logTableContainer}>
                <h3 style={{ color: "#000000" }}>Sign In/Out Logs</h3>
                <div style={styles.tableWrapper}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Employee ID</th>
                                <th>Type</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userLogs.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.email}</td>
                                    <td>{log.employeeId}</td>
                                    <td>{log.type}</td>
                                    <td>{log.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        maxWidth: '1000px',
        margin: '2rem auto',
        padding: '2rem',
        background: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        color: '#000',
        marginBottom: '1rem',
    },
    flexContainer: {
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    form: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minWidth: '280px',
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
    chartContainer: {
        flex: 1,
        minWidth: '300px',
    },
    logTableContainer: {
        marginTop: '2rem',
    },
    tableWrapper: {
        maxHeight: '300px',
        overflow: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        color: "#000000",
        paddingLeft: "25px",
        paddingTop: "25px"
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',

    },
    'table th, table td': {
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'left',
        marginBottom: "10px"
    },
};

export default SignInOut;
