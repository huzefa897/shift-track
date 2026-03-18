import { useEffect, useState, useRef } from "react";
import api from "@/api/axios";
import WorkEntryForm from "@/components/WorkEntryForm";
import WorkEntryTable from "@/components/WorkEntryTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function WorkEntriesPage() {
  const formRef = useRef(null);
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
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

  async function handleUpdateEntry(updatedEntry) {
    try {
      const response = await api.put(`/work-entries/${editingEntry.id}`, updatedEntry);

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === editingEntry.id ? response.data : entry
        )
      );

      setEditingEntry(null);
      setError("");
    } catch (err) {
      console.error("Failed to update work entry:", err);
      setError("Failed to update work entry.");
      throw err;
    }
  }

  function handleEditEntry(entry) {
  setEditingEntry(entry);
  setError("");

  // scroll to form
  setTimeout(() => {
    formRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, 0);
}

  function handleCancelEdit() {
    setEditingEntry(null);
  }

  function handleAskDelete(entry) {
    setEntryToDelete(entry);
    setError("");
  }

  async function handleConfirmDelete() {
    if (!entryToDelete) return;

    try {
      setDeleting(true);

      await api.delete(`/work-entries/${entryToDelete.id}`);

      setEntries((prev) =>
        prev.filter((entry) => entry.id !== entryToDelete.id)
      );

      if (editingEntry?.id === entryToDelete.id) {
        setEditingEntry(null);
      }

      setEntryToDelete(null);
      setError("");
    } catch (err) {
      console.error("Failed to delete work entry:", err);
      setError("Failed to delete work entry.");
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-10 border-b border-zinc-900 pb-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
                ShiftTrack
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                Work Entries
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Add, edit, and review your recorded shifts in one place.
              </p>
            </div>

            <div className="text-sm text-zinc-500">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="space-y-8">
          <div className="max-w-2xl" ref={formRef}>
            <WorkEntryForm
              onAddEntry={handleAddEntry}
              onUpdateEntry={handleUpdateEntry}
              editingEntry={editingEntry}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {loading ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 text-zinc-400">
              Loading work entries...
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  History
                </p>
                <h2 className="mt-1 text-lg font-medium text-zinc-100">
                  Saved Work Entries
                </h2>
                <p className="mt-1 text-sm text-zinc-400">
                  Review previously recorded shifts and update them when needed.
                </p>
              </div>

              <WorkEntryTable
                entries={entries}
                onEditEntry={handleEditEntry}
                onDeleteEntry={handleAskDelete}
              />
            </div>
          )}
        </div>
      </div>

      <AlertDialog
        open={Boolean(entryToDelete)}
        onOpenChange={(open) => {
          if (!open && !deleting) {
            setEntryToDelete(null);
          }
        }}
      >
        <AlertDialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-zinc-100">
              Delete work entry?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This will permanently delete the entry for{" "}
              <span className="font-medium text-zinc-200">
                {entryToDelete?.companyName ??
                  entryToDelete?.company?.name ??
                  "this company"}
              </span>{" "}
              on{" "}
              <span className="font-medium text-zinc-200">
                {entryToDelete?.workDate ?? "the selected date"}
              </span>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={deleting}
              className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
            >
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={handleConfirmDelete}
              disabled={deleting}
              className="bg-red-600 text-white hover:bg-red-500"
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default WorkEntriesPage;