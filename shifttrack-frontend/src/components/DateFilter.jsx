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

function DateFilter({ filters, onChange, onApply, onQuickFilter }) {
  return (
    <Card className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-zinc-100">Filter Range</CardTitle>
        <CardDescription className="text-zinc-400">
          Choose a date range to calculate totals and view matching work entries.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
          <div className="grid gap-2">
            <Label htmlFor="from" className="text-zinc-300">
              From
            </Label>
            <Input
              id="from"
              name="from"
              type="date"
              value={filters?.from || ""}
              onChange={onChange}
              className="border-zinc-800 bg-zinc-900 text-zinc-100"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="to" className="text-zinc-300">
              To
            </Label>
            <Input
              id="to"
              name="to"
              type="date"
              value={filters?.to || ""}
              onChange={onChange}
              className="border-zinc-800 bg-zinc-900 text-zinc-100"
            />
          </div>

          <Button
            type="button"
            onClick={onApply}
            className="w-full bg-white text-black hover:bg-zinc-200 md:w-auto"
          >
            Apply Filter
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onQuickFilter("week")}
            className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
          >
            Last Week
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onQuickFilter("fortnight")}
            className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
          >
            Last Fortnight
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => onQuickFilter("month")}
            className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
          >
            Last Month
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default DateFilter;