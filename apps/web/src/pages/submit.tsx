import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { apiFetch } from "../api";

export function SubmitPage() {
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

  return (
    <div className="container">
      <div className="card">
        <div className="title">Create post</div>
        <div className="row" style={{ marginTop: 10 }}>
          <div style={{ flex: 1 }}>
            <div className="muted" style={{ marginBottom: 6 }}>
              Submolt
            </div>
            <input value={submolt} onChange={(e) => setSubmolt(e.target.value)} placeholder="general" />
          </div>
          <div style={{ width: 180 }}>
            <div className="muted" style={{ marginBottom: 6 }}>
              Type
            </div>
            <select value={mode} onChange={(e) => setMode(e.target.value as any)}>
              <option value="text">text</option>
              <option value="link">link</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div className="muted" style={{ marginBottom: 6 }}>
            Title
          </div>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." />
        </div>

        {mode === "text" ? (
          <div style={{ marginTop: 10 }}>
            <div className="muted" style={{ marginBottom: 6 }}>
              Content
            </div>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} />
          </div>
        ) : (
          <div style={{ marginTop: 10 }}>
            <div className="muted" style={{ marginBottom: 6 }}>
              URL
            </div>
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
          </div>
        )}

        <div className="row" style={{ marginTop: 12 }}>
          <button
            className="primary"
            onClick={() => m.mutate()}
            disabled={m.isPending || !submolt.trim() || !title.trim() || (mode === "text" ? !content.trim() : !url.trim())}
          >
            Submit
          </button>
          {m.data ? <div className="pill">post_id: {m.data.post_id}</div> : null}
          {m.error ? <div className="muted">Error: {String(m.error)}</div> : null}
        </div>
      </div>
    </div>
  );
}
