import type { AnswerOption } from "@/types/learning";

export function AnswerChoices({ options, selected, onSelect, disabled = false, name, lettered = name === "assessment" }: {
  options: AnswerOption[]; selected: string | null; onSelect: (id: string) => void; disabled?: boolean; name: string; lettered?: boolean;
}) {
  return <div className="space-y-2">{options.map((option, index) => <label key={option.id} className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-2xl border p-3 text-sm ${selected === option.id ? "border-primary bg-secondary font-semibold" : "border-border bg-card"} ${disabled ? "cursor-default" : "hover:bg-secondary"}`}>
    <input className="size-5 shrink-0 accent-primary" type="radio" name={name} value={option.id} checked={selected === option.id} disabled={disabled} onChange={() => onSelect(option.id)} />
    <span>{lettered && `${String.fromCharCode(65 + index)}. `}{option.text}</span>
    {selected === option.id && <span className="ml-auto text-xs text-primary">Selected</span>}
  </label>)}</div>;
}
