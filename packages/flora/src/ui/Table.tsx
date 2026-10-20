import * as React from 'react';

export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

/**
 * A plain data table: label-styled headers, a rule under each row. Write the
 * rows yourself, so any cell can hold a button or a link. `data-num` on a cell
 * right-aligns it with even digits; `data-action` shrinks it to its content.
 * Scrolls sideways when it doesn't fit.
 *
 * ```tsx
 * <Table>
 *   <thead><tr><th>item</th><th data-num>sold</th></tr></thead>
 *   <tbody><tr><td>tacos</td><td data-num>42</td></tr></tbody>
 * </Table>
 * ```
 */
export function Table({ className = '', children, ...rest }: TableProps) {
  return (
    <div className="fl-table-wrap">
      <table className={('fl-table ' + className).trim()} {...rest}>
        {children}
      </table>
    </div>
  );
}
