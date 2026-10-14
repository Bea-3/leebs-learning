export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="space-y-2"><p className="eyebrow">{eyebrow}</p><h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{title}</h1><p className="max-w-lg text-sm leading-6 text-muted-foreground">{description}</p></header>;
}
