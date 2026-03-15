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

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(amount || 0));
}

function CompanyList({ companies }) {
  return (
    <Card className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl text-zinc-100">Saved Companies</CardTitle>
        <CardDescription className="text-zinc-400">
          All companies currently available for shift entries.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {companies.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/50 p-8 text-sm text-zinc-400">
            No companies added yet.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <Table>
              <TableHeader>
                <TableRow className="border-zinc-800 bg-zinc-900 hover:bg-zinc-900">
                  <TableHead className="text-zinc-400">Name</TableHead>
                  <TableHead className="text-right text-zinc-400">
                    Weekday
                  </TableHead>
                  <TableHead className="text-right text-zinc-400">
                    Saturday
                  </TableHead>
                  <TableHead className="text-right text-zinc-400">
                    Sunday
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {companies.map((company) => (
                  <TableRow
                    key={company.id}
                    className="border-zinc-800 hover:bg-zinc-900/40"
                  >
                    <TableCell className="font-medium text-zinc-100">
                      {company.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(company.weekdayRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(company.saturdayRate)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(company.sundayRate)}
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

export default CompanyList;