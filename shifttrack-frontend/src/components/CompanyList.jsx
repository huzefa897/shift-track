import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function CompanyList({ companies }) {
  return (
    <Card className="border-zinc-800 bg-zinc-950 text-zinc-100">
      <CardHeader>
        <CardTitle>Saved Companies</CardTitle>
        <CardDescription className="text-zinc-400">
          All companies currently available for shift entries.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {companies.length === 0 ? (
          <div className="rounded-lg border border-dashed border-zinc-800 bg-zinc-900/50 p-6 text-sm text-zinc-400">
            No companies added yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 hover:bg-transparent">
                  <TableHead className="text-zinc-400">Name</TableHead>
                  <TableHead className="text-zinc-400">Weekday</TableHead>
                  <TableHead className="text-zinc-400">Saturday</TableHead>
                  <TableHead className="text-zinc-400">Sunday</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id} className="border-zinc-800">
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>${Number(company.weekdayRate).toFixed(2)}</TableCell>
                    <TableCell>${Number(company.saturdayRate).toFixed(2)}</TableCell>
                    <TableCell>${Number(company.sundayRate).toFixed(2)}</TableCell>
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

export default CompanyList;