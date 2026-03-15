import { useEffect, useState } from "react";
import api from "@/api/axios";
import WorkEntryForm from "@/components/WorkEntryForm";
import WorkEntryTable from "@/components/WorkEntryTable";

function WorkEntriesPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchEntries() {
    try {
      setLoading(true);
      const response = await api.get("/work-entries");
      setEntries(response.data);
      setError("");
    } catch (err) {
      console.error("Failed to fetch work entries:", err);
      setError("Failed to load work entries. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddEntry(newEntry) {
    try {
      const response = await api.post("/work-entries", newEntry);
      setEntries((prev) => [response.data, ...prev]);
      setError("");
    } catch (err) {
      console.error("Failed to add work entry:", err);
      setError("Failed to add work entry.");
      throw err;
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <p className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-500">
            ShiftTrack
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Work Entries</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Record daily shifts and view calculated hours and pay returned by the backend.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <WorkEntryForm onAddEntry={handleAddEntry} />

          {loading ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              Loading work entries...
            </div>
          ) : (
            <WorkEntryTable entries={entries} />
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkEntriesPage;