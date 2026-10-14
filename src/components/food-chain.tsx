import { Fragment } from "react";

export function FoodChain({ organisms }: { organisms: string[] }) {
  return (
    <figure className="space-y-2 rounded-2xl bg-secondary p-4">
      <figcaption className="text-xs font-semibold text-primary">Follow the energy</figcaption>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-3 text-sm font-semibold leading-6" aria-label={organisms.join(" → ")}>
        {organisms.map((organism, index) => <Fragment key={`${index}-${organism}`}>
          {index > 0 && <span aria-hidden="true" className="text-muted-foreground">→</span>}
          <span aria-hidden="true">{organism}</span>
        </Fragment>)}
      </p>
      <p className="text-xs leading-5 text-muted-foreground">Arrows show the direction energy moves.</p>
    </figure>
  );
}
