"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid password");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-6">
      <div className="bg-black-100 p-8 rounded-2xl w-full max-w-md">
        <h1 className="text-white text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-secondary mb-8">Sign in to manage contact messages</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="flex flex-col gap-2">
            <span className="text-white font-medium">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none"
              placeholder="Enter admin password"
            />
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#915EFF] py-3 px-8 rounded-xl text-white font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
