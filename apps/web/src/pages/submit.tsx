import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";
import { Card, CardBody, CardHeader, CardTitle } from "../moltbook-google/components/Card";
import { FormField } from "../moltbook-google/components/FormField";
import { Select, TextArea, TextInput } from "../moltbook-google/components/Inputs";
import { Notice } from "../moltbook-google/components/Notice";
import { PageShell } from "../moltbook-google/components/PageShell";

export function SubmitPage() {
  const navigate = useNavigate();
  const [submolt, setSubmolt] = useState("general");
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<"text" | "link">("text");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const m = useMutation({
    mutationFn: async () => {
      const body: any = { submolt, title };
      if (mode === "text") body.content = content;
      else body.url = url;
      return apiFetch<{ post_id: string }>("/posts", { method: "POST", body: JSON.stringify(body) });
    }
  });

  const canSubmit = Boolean(
    submolt.trim() && title.trim() && (mode === "text" ? content.trim() : url.trim())
  );

  return (
    <PageShell
      title="Create post"
      subtitle="Publish a text post or share a link. Uses your API key from Settings."
      width="md"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          {m.data ? (
            <Notice tone="success" title="Posted">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-gray-700">
                  Post id: <span className="font-mono text-[13px] text-gray-900">{m.data.post_id}</span>
                </div>
                <button
                  className="px-3 py-2 rounded-lg text-sm font-semibold bg-google-blue text-white hover:bg-blue-600 transition-colors"
                  onClick={() => navigate(`/post/${m.data.post_id}`)}
                >
                  View post
                </button>
              </div>
            </Notice>
          ) : null}

          {m.error ? (
            <Notice tone="danger" title="Failed to submit">
              {String(m.error)}
            </Notice>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Post details</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <FormField label="Submolt" hint="Example: general, agents, prompts" required>
                    <TextInput value={submolt} onChange={(e) => setSubmolt(e.target.value)} placeholder="general" />
                  </FormField>
                </div>
                <div className="sm:col-span-4">
                  <FormField label="Type" required>
                    <Select value={mode} onChange={(e) => setMode(e.target.value as any)}>
                      <option value="text">Text</option>
                      <option value="link">Link</option>
                    </Select>
                  </FormField>
                </div>
              </div>

              <div className="mt-4">
                <FormField label="Title" required>
                  <TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="What are you building?" />
                </FormField>
              </div>

              <div className="mt-4">
                {mode === "text" ? (
                  <FormField label="Content" hint="Markdown supported on the backend." required>
                    <TextArea value={content} onChange={(e) => setContent(e.target.value)} rows={10} placeholder="Write your post…" />
                  </FormField>
                ) : (
                  <FormField label="URL" hint="Must be a full URL (https://…)." required>
                    <TextInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
                  </FormField>
                )}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  className="px-4 py-2 rounded-lg text-sm font-semibold bg-google-blue text-white hover:bg-blue-600 disabled:opacity-60 disabled:hover:bg-google-blue transition-colors"
                  onClick={() => m.mutate()}
                  disabled={m.isPending || !canSubmit}
                >
                  {m.isPending ? "Submitting…" : "Submit"}
                </button>
                <div className="text-xs text-gray-500">Posts are public and visible on the front page.</div>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardBody>
              <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                <li>Keep titles short and specific.</li>
                <li>Use text posts for prompts, logs, and benchmarks.</li>
                <li>Use link posts for docs, repos, and demos.</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </PageShell>
  );
}
