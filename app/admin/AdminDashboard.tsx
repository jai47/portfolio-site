"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ContactMessage } from "@/lib/db";

interface Stats {
  total: number;
  unread: number;
}

export default function AdminDashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, unread: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeStatus, setResumeStatus] = useState("");
  const [savingResume, setSavingResume] = useState(false);
  const router = useRouter();

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/messages");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch messages");

      const data = await res.json();
      setMessages(data.messages);
      setStats(data.stats);
    } catch {
      setError("Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const fetchResume = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/resume");
      if (!res.ok) return;
      const data = await res.json();
      setResumeUrl(data.resumeUrl ?? "");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    fetchMessages();
    fetchResume();
  }, [fetchMessages, fetchResume]);

  const markAsRead = async (id: string, read: boolean) => {
    const res = await fetch("/api/admin/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    if (res.ok) fetchMessages();
  };

  const deleteMsg = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    const res = await fetch(`/api/admin/messages?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) fetchMessages();
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const saveResume = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingResume(true);
    setResumeStatus("");
    try {
      const res = await fetch("/api/admin/resume", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeUrl }),
      });
      const data = await res.json();
      if (!res.ok) {
        setResumeStatus(data.error || "Failed to save");
        return;
      }
      setResumeUrl(data.resumeUrl ?? "");
      setResumeStatus("Resume link saved.");
    } catch {
      setResumeStatus("Failed to save resume link");
    } finally {
      setSavingResume(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-white text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-secondary mt-1">Contact form submissions</p>
          </div>
          <div className="flex gap-3">
            <a
              href="/"
              className="bg-tertiary px-5 py-3 rounded-xl text-white font-medium hover:bg-black-100 transition"
            >
              View Site
            </a>
            <button
              onClick={logout}
              className="bg-[#915EFF] px-5 py-3 rounded-xl text-white font-medium hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <div className="bg-black-100 p-6 rounded-2xl">
            <p className="text-secondary text-sm">Total Messages</p>
            <p className="text-white text-4xl font-bold mt-2">{stats.total}</p>
          </div>
          <div className="bg-black-100 p-6 rounded-2xl">
            <p className="text-secondary text-sm">Unread</p>
            <p className="text-[#915EFF] text-4xl font-bold mt-2">{stats.unread}</p>
          </div>
        </div>

        <div className="bg-black-100 p-6 rounded-2xl mb-10">
          <h2 className="text-white text-xl font-bold">Resume / CV</h2>
          <p className="text-secondary text-sm mt-1">
            Paste a public link (Google Drive, Dropbox, or a direct PDF URL). It
            appears as a Download CV button on the homepage.
          </p>
          <form onSubmit={saveResume} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="url"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://..."
              className="flex-1 bg-tertiary rounded-xl px-4 py-3 text-white outline-none border border-transparent focus:border-[#915EFF]"
            />
            <button
              type="submit"
              disabled={savingResume}
              className="bg-[#915EFF] px-5 py-3 rounded-xl text-white font-medium hover:opacity-90 transition disabled:opacity-60"
            >
              {savingResume ? "Saving..." : "Save link"}
            </button>
          </form>
          {resumeStatus && (
            <p className="text-secondary text-sm mt-3">{resumeStatus}</p>
          )}
        </div>

        {loading && <p className="text-secondary">Loading messages...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && messages.length === 0 && (
          <div className="bg-black-100 p-10 rounded-2xl text-center">
            <p className="text-secondary">No messages yet.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-black-100 p-6 rounded-2xl border-l-4 ${
                msg.read ? "border-secondary" : "border-[#915EFF]"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                  <h3 className="text-white font-bold text-lg">{msg.name}</h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-[#915EFF] text-sm hover:underline"
                  >
                    {msg.email}
                  </a>
                  <p className="text-secondary text-xs mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => markAsRead(msg.id, !msg.read)}
                    className="bg-tertiary px-4 py-2 rounded-lg text-white text-sm hover:bg-primary transition"
                  >
                    {msg.read ? "Mark Unread" : "Mark Read"}
                  </button>
                  <button
                    onClick={() => deleteMsg(msg.id)}
                    className="bg-red-900/40 px-4 py-2 rounded-lg text-red-300 text-sm hover:bg-red-900/60 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-white-100 mt-4 text-sm leading-relaxed whitespace-pre-wrap">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
