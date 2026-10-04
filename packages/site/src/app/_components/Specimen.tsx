import { ReactNode } from 'react';

interface SpecimenProps {
  label: string;
  /** one line on when to reach for it */
  note?: string;
  /** lay the stage out as a block rather than a wrapping row */
  block?: boolean;
  children: ReactNode;
}

/**
 * One labelled specimen on a gallery page: what it is, when to use it, and the
 * live thing on a bordered stage.
 */
export function Specimen({
  label,
  note,
  block = false,
  children,
}: SpecimenProps) {
  return (
    <div className="specimen">
      <div className="label">{label}</div>
      {note && <p className="note">{note}</p>}
      <div className="stage" data-block={block}>
        {children}
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export function PageHead({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-head">
      <div className="eyebrow">{eyebrow}</div>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </div>
  );
}
