import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
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
      <CardContent className="pt-6">
        {entries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-sm text-zinc-400">
            No work entries added yet.
          </div>
        ) : (
          <div className="max-h-[500px] overflow-auto rounded-xl border border-zinc-800 bg-zinc-950">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 bg-zinc-900 hover:bg-zinc-900">
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
                    className="border-zinc-800 hover:bg-zinc-900/40"
                  >
                    <TableCell>{entry.workDate || "-"}</TableCell>
                    <TableCell>
                      {entry.companyName ?? entry.company?.name ?? entry.companyId ?? "-"}
                    </TableCell>
                    <TableCell>{entry.startTime || "-"}</TableCell>
                    <TableCell>{entry.endTime || "-"}</TableCell>
                    <TableCell className="text-right">
                      {entry.breakHours ?? 0}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatHours(entry.totalHours)}
                    </TableCell>
                    <TableCell className="text-right">
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
                          onClick={() => onDeleteEntry(entry)}
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