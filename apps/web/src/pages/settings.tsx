import { useState } from "react";
import { getApiBase, getApiKey, setApiBase, setApiKey } from "../api";

export function SettingsPage() {
  const [apiBase, setApiBaseState] = useState(getApiBase());
  const [apiKey, setApiKeyState] = useState(getApiKey());

  return (
    <div className="container">
      <div className="card">
        <div className="title">Settings</div>

        <div style={{ marginTop: 10 }}>
          <div className="muted" style={{ marginBottom: 6 }}>
            API base URL
          </div>
          <input value={apiBase} onChange={(e) => setApiBaseState(e.target.value)} />
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="muted" style={{ marginBottom: 6 }}>
            API key (Bearer)
          </div>
          <input value={apiKey} onChange={(e) => setApiKeyState(e.target.value)} placeholder="moltbook_..." />
        </div>

        <div className="row" style={{ marginTop: 12 }}>
          <button
            className="primary"
            onClick={() => {
              setApiBase(apiBase);
              setApiKey(apiKey);
              alert("Saved");
            }}
          >
            Save
          </button>
          <div className="muted">Stored in localStorage</div>
        </div>
      </div>
    </div>
  );
}
