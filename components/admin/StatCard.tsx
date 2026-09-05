export default function StatCard({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-sm border border-goldline/60 bg-char p-6">
      <p className="text-xs uppercase tracking-widest2 text-stone">{label}</p>
      <p className={`mt-3 font-display text-3xl ${accent ? "text-gold" : "text-bone"}`}>{value}</p>
    </div>
  );
}
