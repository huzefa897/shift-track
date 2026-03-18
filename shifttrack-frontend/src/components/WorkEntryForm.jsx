import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllCompanies } from "@/api/companyService";

const initialFormData = {
  companyId: "",
  workDate: "",
  startTime: "",
  endTime: "",
  breakHours: "",
  notes: "",
};

function WorkEntryForm({
  onAddEntry,
  onUpdateEntry,
  editingEntry,
  onCancelEdit,
}) {
const [companies, setCompanies] = useState([]);
const [loadingCompanies, setLoadingCompanies] = useState(true);
const [submitting, setSubmitting] = useState(false);

const [formData, setFormData] = useState(initialFormData);

useEffect(() => {
  async function loadCompanies() {
    try {
      const response = await getAllCompanies();
      setCompanies(response);
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    } finally {
      setLoadingCompanies(false);
    }
  }

  loadCompanies();
}, []);

  useEffect(() => {
    if (editingEntry) {
      setFormData({
        companyId: String(
          editingEntry.companyId ?? editingEntry.company?.id ?? ""
        ),
        workDate: editingEntry.workDate ?? "",
        startTime: editingEntry.startTime ?? "",
        endTime: editingEntry.endTime ?? "",
        breakHours:
          editingEntry.breakHours !== null &&
          editingEntry.breakHours !== undefined
            ? String(editingEntry.breakHours)
            : "",
        notes: editingEntry.notes ?? "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingEntry]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      companyId: Number(formData.companyId),
      workDate: formData.workDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      breakHours: formData.breakHours === "" ? 0 : Number(formData.breakHours),
      notes: formData.notes.trim(),
    };

    setSubmitting(true);

    try {
      if (editingEntry) {
        await onUpdateEntry(payload);
      } else {
        await onAddEntry(payload);
      }

      setFormData(initialFormData);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-zinc-100">
          {editingEntry ? "Edit Work Entry" : "Add Work Entry"}
        </CardTitle>
        <CardDescription className="text-zinc-400">
          {editingEntry
            ? "Update the selected shift."
            : "Record a shift for a selected company."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="companyId" className="text-zinc-300">
                Company
              </Label>
              <select
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                required
                disabled={loadingCompanies}
                className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-zinc-600 disabled:opacity-60"
              >
                <option value="">
                  {loadingCompanies ? "Loading companies..." : "Select a company"}
                </option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="workDate" className="text-zinc-300">
                  Work Date
                </Label>
                <Input
                  id="workDate"
                  name="workDate"
                  type="date"
                  value={formData.workDate}
                  onChange={handleChange}
                  required
                  className="border-zinc-800 bg-zinc-900 text-zinc-100"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="breakHours" className="text-zinc-300">
                  Break Hours
                </Label>
                <Input
                  id="breakHours"
                  name="breakHours"
                  type="number"
                  step="0.25"
                  min="0"
                  placeholder="0.5"
                  value={formData.breakHours}
                  onChange={handleChange}
                  className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="startTime" className="text-zinc-300">
                  Start Time
                </Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="border-zinc-800 bg-zinc-900 text-zinc-100"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="endTime" className="text-zinc-300">
                  End Time
                </Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="border-zinc-800 bg-zinc-900 text-zinc-100"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes" className="text-zinc-300">
                Notes
              </Label>
              <textarea
                id="notes"
                name="notes"
                placeholder="Optional notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-zinc-600"
              />
            </div>
          </div>

        <div className="flex flex-col gap-3 md:flex-row md:justify-end">
  {editingEntry && (
    <Button
      type="button"
      variant="outline"
      onClick={onCancelEdit}
      className="border-red-900 bg-red-950/40 text-red-300 hover:bg-red-950/70"
    >
      Cancel Edit
    </Button>
  )}

  <Button
    type="submit"
    className="bg-white text-black hover:bg-zinc-200"
  >
    {editingEntry ? "Update Entry" : "Save Entry"}
  </Button>
</div> 
        </form>
      </CardContent>
    </Card>
  );
}

export default WorkEntryForm;