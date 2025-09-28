import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setConnectedApps, toggleApp } from '../../../redux/slices/affiliatedAppsSlice';
import { AppDispatch, store } from '../../../redux/Store';

interface ConnectedAppsState {
    knowledgeCity: boolean;
    nerves: boolean;
    muzik: boolean;
}

const AffiliatedApps: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [connectedApps, setConnectedAppsState] = useState({
        knowledgeCity: false,
        nerves: false,
        muzik: false,
    });

    // const handleToggle = (app: keyof typeof connectedApps) => {

    // };

    const handleToggle = (app: keyof ConnectedAppsState) => {
        setConnectedAppsState(prev => ({
            ...prev,
            [app]: !prev[app],
        }));
        store.dispatch(toggleApp(app));
    };

    const handleSubmit = () => {
        dispatch(setConnectedApps(connectedApps))
        console.log(connectedApps)
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ color: "#000000" }}>Connected Applications</h2>
            <p style={{ fontSize: "14px", color: "#555" }}>
                Toggle access to applications connected to your account.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginTop: "20px" }}>
                {[
                    { name: 'Knowledge City', key: 'knowledgeCity' },
                    { name: 'Nerves', key: 'nerves' },
                    { name: 'Muzik', key: 'muzik' },
                ].map(({ name, key }) => (
                    <label
                        key={key}
                        style={{
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                            fontSize: '14px',
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            color: "#000000",
                            backgroundColor: "#ffffff"
                        }}>
                        <span>{name}</span>
                        <input
                            type="checkbox"
                            checked={connectedApps[key as keyof typeof connectedApps]}
                            onChange={() => handleToggle(key as keyof typeof connectedApps)}
                            style={{ transform: 'scale(1.2)' }}
                        />
                    </label>
                ))}

                <button
                    onClick={handleSubmit}
                    style={{
                        marginTop: "20px",
                        padding: "12px",
                        backgroundColor: "#071D6A",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    Save Connected Apps
                </button>
            </div>
        </div>
    );
};

export default AffiliatedApps;
