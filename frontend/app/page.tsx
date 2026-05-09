"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!backendUrl) {
      setOutput("Missing NEXT_PUBLIC_BACKEND_URL");
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch(`${backendUrl}/api/insights`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input })
      });
      const data = await res.json();
      setOutput(data.output || "No output");
    } catch (err) {
      setOutput("Error calling backend");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <div className="card">
        <h1>FinCopilot</h1>
        <p className="subtitle">
          AI Agent tư vấn quản lý dòng tiền cá nhân (demo)
        </p>
        <form onSubmit={handleSubmit} className="form">
          <label>
            Tình huống tài chính của bạn
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ví dụ: Tháng này tôi chi tiêu quá nhiều cho ăn uống..."
              rows={6}
            />
          </label>
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? "Đang phân tích..." : "Nhận tư vấn"}
          </button>
        </form>
        {output && (
          <div className="result">
            <h3>Gợi ý từ FinCopilot</h3>
            <pre>{output}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
