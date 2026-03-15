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

function WorkEntryTable({ entries }) {
  return (
    <Card className="border-zinc-800 bg-zinc-950 text-zinc-100">
      <CardHeader>
        <CardTitle>Saved Work Entries</CardTitle>
        <CardDescription className="text-zinc-400">
          All recorded shifts returned by the backend.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {entries.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/50 p-6 text-sm text-zinc-400">
            No work entries added yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Date</TableHead>
                  <TableHead className="text-zinc-400">Company</TableHead>
                  <TableHead className="text-zinc-400">Start</TableHead>
                  <TableHead className="text-zinc-400">End</TableHead>
                  <TableHead className="text-zinc-400">Break</TableHead>
                  <TableHead className="text-zinc-400">Hours</TableHead>
                  <TableHead className="text-zinc-400">Pay</TableHead>
                  <TableHead className="text-zinc-400">Notes</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id} className="border-zinc-800">
                    <TableCell>{entry.workDate}</TableCell>
                    <TableCell>{entry.companyName ?? entry.company?.name ?? entry.companyId}</TableCell>
                    <TableCell>{entry.startTime}</TableCell>
                    <TableCell>{entry.endTime}</TableCell>
                    <TableCell>{entry.breakHours}</TableCell>
                    <TableCell>{entry.totalHours ?? "-"}</TableCell>
                    <TableCell>
                      {entry.calculatedPay != null
                        ? `$${Number(entry.calculatedPay).toFixed(2)}`
                        : "-"}
                    </TableCell>
                    <TableCell className="max-w-[220px] truncate">
                      {entry.notes || "-"}
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