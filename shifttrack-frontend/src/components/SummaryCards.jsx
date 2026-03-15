import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(amount || 0));
}

function formatHours(hours) {
  return Number(hours || 0).toFixed(2);
}

function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Total Hours",
      value: formatHours(summary.totalHours),
      description: "Hours worked in selected range",
    },
    {
      title: "Total Pay",
      value: formatCurrency(summary.totalPay),
      description: "Calculated income in selected range",
    },
    {
      title: "Total Entries",
      value: summary.totalEntries ?? 0,
      description: "Recorded shifts in selected range",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="rounded-2xl border-zinc-800 bg-zinc-950 text-zinc-100 shadow-sm"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">
              {card.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-3xl font-semibold tracking-tight text-zinc-100">
              {card.value}
            </div>
            <CardDescription className="mt-2 text-zinc-500">
              {card.description}
            </CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default SummaryCards;