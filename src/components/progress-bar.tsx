export function ProgressBar({ value, max, label }: { value: number; max: number; label: string }) {
  const safeMax = Math.max(1, max);
  const safeValue = Math.max(0, Math.min(value, safeMax));
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-4 text-xs font-medium">
        <span>{label}</span><span>{safeValue} of {safeMax}</span>
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        className="h-2 overflow-hidden rounded-full bg-secondary"
      >
        <div className="h-full rounded-full bg-primary" style={{ width: `${safeValue / safeMax * 100}%` }} />
      </div>
    </div>
  );
}
