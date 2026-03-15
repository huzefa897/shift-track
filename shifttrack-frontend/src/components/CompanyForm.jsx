import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CompanyForm({ onAddCompany }) {
  const [formData, setFormData] = useState({
    name: "",
    weekdayRate: "",
    saturdayRate: "",
    sundayRate: "",
  });

  const [submitting, setSubmitting] = useState(false);

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
    };

    setSubmitting(true);

    try {
      await onAddCompany(payload);

      setFormData({
        name: "",
        weekdayRate: "",
        saturdayRate: "",
        sundayRate: "",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950 text-zinc-100">
      <CardHeader>
        <CardTitle>Add Company</CardTitle>
        <CardDescription className="text-zinc-400">
          Save a company and define weekday, Saturday, and Sunday rates.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="name">Company Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. RDC"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-zinc-800 bg-zinc-900"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="weekdayRate">Weekday Rate</Label>
              <Input
                id="weekdayRate"
                name="weekdayRate"
                type="number"
                step="0.01"
                placeholder="30"
                value={formData.weekdayRate}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="saturdayRate">Saturday Rate</Label>
              <Input
                id="saturdayRate"
                name="saturdayRate"
                type="number"
                step="0.01"
                placeholder="35"
                value={formData.saturdayRate}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="sundayRate">Sunday Rate</Label>
              <Input
                id="sundayRate"
                name="sundayRate"
                type="number"
                step="0.01"
                placeholder="40"
                value={formData.sundayRate}
                onChange={handleChange}
                required
                className="border-zinc-800 bg-zinc-900"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={submitting}
              className="bg-white text-black hover:bg-zinc-200"
            >
              {submitting ? "Saving..." : "Save Company"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default CompanyForm;