import { useEffect, useState } from "react";
import api from "@/api/axios";
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

function WorkEntryForm({ onAddEntry }) {
  const [companies, setCompanies] = useState([]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    companyId: "",
    workDate: "",
    startTime: "",
    endTime: "",
    breakHours: "",
    notes: "",
  });

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await api.get("/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoadingCompanies(false);
      }
    }

    fetchCompanies();
  }, []);

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
      await onAddEntry(payload);

      setFormData({
        companyId: "",
        workDate: "",
        startTime: "",
        endTime: "",
        breakHours: "",
        notes: "",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950 text-zinc-100">
      <CardHeader>
        <CardTitle>Add Work Entry</CardTitle>
        <CardDescription className="text-zinc-400">
          Record a shift for a selected company.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="companyId">Company</Label>
            <select
              id="companyId"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
              disabled={loadingCompanies}
              className="flex h-10 w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none"
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
              <Label htmlFor="workDate">Work Date</Label>
              <Input
                id="workDate"
                name="workDate"
                type="date"
                value={formData.workDate}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="breakHours">Break Hours</Label>
              <Input
                id="breakHours"
                name="breakHours"
                type="number"
                step="0.25"
                min="0"
                placeholder="0.5"
                value={formData.breakHours}
                onChange={handleChange}
                className="border-zinc-800 bg-zinc-900"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Optional notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none"
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting || loadingCompanies}
              className="bg-white text-black hover:bg-zinc-200"
            >
              {submitting ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default WorkEntryForm;