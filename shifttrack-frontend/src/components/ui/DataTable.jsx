export default function DataTable({ columns, data, emptyState }) {
  if (!data || data.length === 0) {
    return emptyState || null;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800">
      <table className="w-full min-w-[700px]">
        <thead className="bg-zinc-900">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-4 py-3 text-sm font-medium text-zinc-300 ${
                  column.align === "right" ? "text-right" : "text-left"
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800 bg-zinc-950">
          {data.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex} className="transition hover:bg-zinc-900/50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-4 py-4 text-sm text-zinc-200 ${
                    column.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {column.render ? column.render(row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}