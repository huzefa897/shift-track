export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-10 text-center">
      <h3 className="text-base font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
    </div>
  );
}