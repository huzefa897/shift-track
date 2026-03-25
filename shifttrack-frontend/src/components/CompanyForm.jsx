import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialFormData = {
  name: "",
  weekdayRate: "",
  saturdayRate: "",
  sundayRate: "",
  taxRate: "",
};

function CompanyForm({
  onAddCompany,
  onUpdateCompany,
  editingCompany,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingCompany) {
      setFormData({
        name: editingCompany.name || "",
        weekdayRate: editingCompany.weekdayRate || "",
        saturdayRate: editingCompany.saturdayRate || "",
        sundayRate: editingCompany.sundayRate || "",
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editingCompany]);

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
      name: formData.name.trim(),
      weekdayRate: Number(formData.weekdayRate),
      saturdayRate: Number(formData.saturdayRate),
      sundayRate: Number(formData.sundayRate),
      taxRate: Number(formData.taxRate),
    };

    setSubmitting(true);

    try {
      if (editingCompany) {
        await onUpdateCompany(editingCompany.id, payload);
      } else {
        await onAddCompany(payload);
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
          {editingCompany ? "Edit Company" : "Add Company"}
        </CardTitle>
        <CardDescription className="text-zinc-400">
          {editingCompany
            ? "Update the company details and pay rates."
            : "Save a company and define weekday, Saturday, and Sunday rates."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-zinc-300">
              Company Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. RDC"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="weekdayRate" className="text-zinc-300">
                Weekday Rate
              </Label>
              <Input
                id="weekdayRate"
                name="weekdayRate"
                type="number"
                step="0.01"
                placeholder="30"
                value={formData.weekdayRate}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="saturdayRate" className="text-zinc-300">
                Saturday Rate
              </Label>
              <Input
                id="saturdayRate"
                name="saturdayRate"
                type="number"
                step="0.01"
                placeholder="35"
                value={formData.saturdayRate}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sundayRate" className="text-zinc-300">
                Sunday Rate
              </Label>
              <Input
                id="sundayRate"
                name="sundayRate"
                type="number"
                step="0.01"
                placeholder="40"
                value={formData.sundayRate}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-zinc-300">Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              step="0.01"
              min="0"
              max="100"
              value={formData.taxRate}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
            />
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:justify-end">
            {editingCompany && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancelEdit}
                className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-white text-black hover:bg-zinc-200 md:w-auto"
            >
              {submitting
                ? editingCompany
                  ? "Updating..."
                  : "Saving..."
                : editingCompany
                  ? "Update Company"
                  : "Save Company"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default CompanyForm;
