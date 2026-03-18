import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function formatCurrency(amount) {
  if (amount == null) return "-";
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(amount));
}

function formatHours(hours) {
  if (hours == null) return "-";
  return `${Number(hours).toFixed(2)}`;
}

function WorkEntryTable({ entries, onEditEntry, onDeleteEntry }) {
  return (
    <Card className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-zinc-100">Saved Work Entries</CardTitle>
        <CardDescription className="text-zinc-400">
          All recorded shifts returned by the backend.
        </CardDescription>
      </CardHeader>

      <CardContent>
      {entries.length === 0 ? (
  <div className="flex flex-col items-center justify-center gap-2 py-12 text-zinc-400">
    <p className="text-sm">No work entries yet</p>
    <p className="text-xs text-zinc-500">
      Add your first entry using the form above
    </p>
  </div>
) : (
<div className="max-h-[520px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-950" style={{ scrollbarWidth: "thin" }}>
            <Table className="border-separate border-spacing-y-1">
              <TableHeader className="sticky top-0 z-10 bg-zinc-900">
                <TableRow className="bg-zinc-950 border-b border-zinc-800">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Company</TableHead>
                  <TableHead className="text-zinc-400">Start</TableHead>
                  <TableHead className="text-zinc-400">End</TableHead>
                  <TableHead className="text-right text-zinc-400">Break</TableHead>
                  <TableHead className="text-right text-zinc-400">Hours</TableHead>
                  <TableHead className="text-right text-zinc-400">Pay</TableHead>
                  <TableHead className="text-zinc-400">Notes</TableHead>
                  <TableHead className="w-[180px] text-right text-zinc-400">
  Actions
</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {entries.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="border border-zinc-800 bg-zinc-950 hover:bg-zinc-900/60 transition-colors"
                  >
                    <TableCell>{entry.workDate || "-"}</TableCell>
                    <TableCell>
                      {entry.companyName ?? entry.company?.name ?? entry.companyId ?? "-"}
                    </TableCell>
                    <TableCell>{entry.startTime || "-"}</TableCell>
                    <TableCell>{entry.endTime || "-"}</TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {entry.breakHours ?? 0}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatHours(entry.totalHours)}
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      {formatCurrency(entry.calculatedPay)}
                    </TableCell>
                    <TableCell>
                      <span
                        title={entry.notes || ""}
                        className="block max-w-[220px] truncate text-zinc-300"
                      >
                        {entry.notes || "-"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium tabular-nums">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => onEditEntry(entry)}
                        className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                 <div className="flex justify-end gap-2">
    <Button
      type="button"
      variant="outline"
      onClick={() => onEditEntry(entry)}
      className="border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
    >
      Edit
    </Button>

    <Button
      type="button"
      variant="outline"
      onClick={() => onDeleteEntry(entry.id)}
      className="border-red-900 bg-red-950/40 text-red-300 hover:bg-red-950/70 hover:text-red-200"
    >
      Delete
    </Button>
  </div>
</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default WorkEntryTable;