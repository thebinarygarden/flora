// Safe in client components: no server imports.

/** Fills `{name}` placeholders: format('hue {n}', { n: 330 }) */
export const format = (s: string, vars: Record<string, string | number>) =>
  s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
