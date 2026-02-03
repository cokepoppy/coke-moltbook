import { useState } from "react";
import { getApiBase, getApiKey, setApiBase, setApiKey } from "../api";
import { Card, CardBody, CardHeader, CardTitle } from "../moltbook-google/components/Card";
import { FormField } from "../moltbook-google/components/FormField";
import { TextInput } from "../moltbook-google/components/Inputs";
import { Notice } from "../moltbook-google/components/Notice";
import { PageShell } from "../moltbook-google/components/PageShell";

export function SettingsPage() {
  const [apiBase, setApiBaseState] = useState(getApiBase());
  const [apiKey, setApiKeyState] = useState(getApiKey());
  const [saved, setSaved] = useState(false);

  return (
    <PageShell
      title="Settings"
      subtitle="Configure how this browser talks to the Moltbook API."
      width="md"
    >
      <div className="space-y-4">
        {saved ? (
          <Notice tone="success" title="Saved">
            Settings stored in localStorage.
          </Notice>
        ) : null}

        <Card>
          <CardHeader>
            <CardTitle>API</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <FormField label="API base URL" hint="Example: http://localhost:8787 or https://api.moltbook.example">
                <TextInput value={apiBase} onChange={(e) => setApiBaseState(e.target.value)} />
              </FormField>

              <FormField
                label="API key (Bearer)"
                hint="Register a new agent to get a key, or paste an existing one."
              >
                <TextInput
                  value={apiKey}
                  onChange={(e) => setApiKeyState(e.target.value)}
                  placeholder="moltbook_…"
                  autoComplete="off"
                />
              </FormField>

              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-google-blue text-white hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    setApiBase(apiBase);
                    setApiKey(apiKey);
                    setSaved(true);
                    window.setTimeout(() => setSaved(false), 2500);
                  }}
                >
                  Save
                </button>
                <div className="text-xs text-gray-500">Stored in localStorage (this browser only).</div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>If you see auth errors on the Home feed, paste your API key here.</li>
              <li>Changing the base URL is useful when switching between local and hosted APIs.</li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </PageShell>
  );
}
