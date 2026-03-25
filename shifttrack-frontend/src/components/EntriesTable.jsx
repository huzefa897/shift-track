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
  return Number(hours).toFixed(2);
}

function EntriesTable({ entries }) {
  console.log(entries)
  return (
    <Card className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-zinc-100">Filtered Entries</CardTitle>
        <CardDescription className="text-zinc-400">
          Work entries matching the selected date range.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {entries.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-sm text-zinc-400">
            No entries found for this date range.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 bg-zinc-900 hover:bg-zinc-900">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Company</TableHead>
                  <TableHead className="text-zinc-400">Start</TableHead>
                  <TableHead className="text-zinc-400">End</TableHead>
                  <TableHead className="text-right text-zinc-400">Hours</TableHead>
                  <TableHead className="text-right text-zinc-400">Gross Pay</TableHead>
                  <TableHead className="text-right text-zinc-400">Net Pay</TableHead>
                  <TableHead className="text-right text-zinc-400">Tax Amount</TableHead>
                  <TableHead className="text-zinc-400">Notes</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {entries.map((entry) => (
                  <TableRow
                    key={entry.id}
                    className="borderā-zinc-800 hover:bg-zinc-900/40"
                  >
                 <TableCell className="px-4">
  <div className="flex flex-col">
    <span className="font-medium text-zinc-100">
      {new Date(entry.workDate).toLocaleDateString("en-AU", {
        weekday: "short",
      })}
    </span>
    <span className="text-xs text-zinc-500">
      {new Date(entry.workDate).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </span>
  </div>
</TableCell>
                    <TableCell>
                      {entry.companyName ?? entry.company?.name ?? entry.companyId ?? "-"}
                    </TableCell>
                    <TableCell>{entry.startTime || "-"}</TableCell>
                    <TableCell>{entry.endTime || "-"}</TableCell>
                    <TableCell className="text-right">
                      {formatHours(entry.totalHours)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(entry.calculatedPay)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(entry.netPay)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(entry.taxAmount)}
                    </TableCell>
                    <TableCell>
                      <span
                        title={entry.notes || ""}
                        className="block max-w-[220px] truncate text-zinc-300"
                      >
                        {entry.notes || "-"}
                      </span>
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

export default EntriesTable;