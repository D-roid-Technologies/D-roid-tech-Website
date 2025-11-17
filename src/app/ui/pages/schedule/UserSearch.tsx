import React from "react";
import styles from "./styles";

type Props = {
    query: string;
    setQuery: (q: string) => void;
    results: { id: string; name: string; title?: string }[];
    loading: boolean;
    error: string | null;
    onSearch: (q: string) => void;
    navigate: (path: string) => void;
};

const UserSearch: React.FC<Props> = ({ query, setQuery, results, loading, error, onSearch, navigate }) => {
    return (
        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #eef2f7" }}>
            <h4 style={{ marginBottom: "0.5rem", color: "#000000" }}>Find Someone on D'roid Scheudles</h4>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by username or name" style={{ flex: 1, padding: "0.5rem", borderRadius: 8, border: "1px solid #e2e8f0" }} />
                <button onClick={() => onSearch(query.trim())} style={{ ...styles.navButton, backgroundColor: "#3b82f6", color: "#fff" }}>{loading ? "Searching..." : "Search"}</button>
            </div>

            <div style={{ marginTop: "0.75rem" }}>
                {error && <div style={{ color: "#ef4444" }}>{error}</div>}
                {results.length > 0 && (
                    <ul style={{ listStyle: "none", padding: 0, marginTop: 8 }}>
                        {results.map((r) => (
                            <li key={r.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #f1f5f9" }}>
                                <div>
                                    <div style={{ fontWeight: 600 }}>{r.name}</div>
                                    {r.title && <div style={{ fontSize: "0.85rem", color: "#64748b" }}>{r.title}</div>}
                                </div>
                                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                                    <button onClick={() => navigate(`/users/${r.id}`)} style={{ ...styles.navButton, backgroundColor: "#e2e8f0", color: "#0f172a" }}>View</button>
                                    <button onClick={() => navigate(`/messages/compose?to=${encodeURIComponent(r.id)}`)} style={{ ...styles.navButton, backgroundColor: "#10b981", color: "#fff" }}>Message</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserSearch;