'use client';

import { IconPlus } from '../../icons';

interface CreateTemplateCardProps {
  onCreateNew: () => void;
  expanded: boolean;
  onClick?: () => void;
}

export function CreateTemplateCard({
  onCreateNew,
  expanded,
  onClick,
}: CreateTemplateCardProps) {
  // Expanded view (selected)
  if (expanded) {
    return (
      <button
        onClick={onCreateNew}
        className="rounded-xl p-6 border-2 border-dashed flex flex-col items-center justify-center gap-4 min-h-[280px] transition-all hover:scale-[1.02] relative overflow-hidden"
        style={{
          borderColor: 'var(--primary)',
          backgroundColor: 'var(--surface-variant)',
          color: 'var(--on-surface-variant)',
        }}
        onMouseEnter={(e) => {
          const overlay = e.currentTarget.querySelector(
            '.hover-overlay'
          ) as HTMLElement;
          if (overlay) overlay.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          const overlay = e.currentTarget.querySelector(
            '.hover-overlay'
          ) as HTMLElement;
          if (overlay) overlay.style.opacity = '0';
        }}
      >
        <span
          className="hover-overlay absolute inset-0 transition-opacity pointer-events-none"
          style={{
            backgroundColor: 'var(--hover)',
            opacity: 0,
          }}
        />
        <span className="relative z-10">
          <IconPlus size={64} color="var(--primary)" />
        </span>
        <div className="text-2xl font-bold relative z-10">
          Create New Template
        </div>
        <div className="text-sm opacity-70 relative z-10">
          Design a custom theme
        </div>
      </button>
    );
  }

  // Collapsed view (not selected)
  return (
    <button
      onClick={onClick}
      className="rounded-xl px-3 py-3 border-2 border-dashed transition-all hover:scale-[1.01] flex flex-row items-center gap-3 relative overflow-hidden min-h-[66px]"
      style={{
        backgroundColor: 'var(--surface-variant)',
        borderColor: 'var(--on-surface-variant)',
      }}
      onMouseEnter={(e) => {
        const overlay = e.currentTarget.querySelector(
          '.hover-overlay'
        ) as HTMLElement;
        if (overlay) overlay.style.opacity = '1';
      }}
      onMouseLeave={(e) => {
        const overlay = e.currentTarget.querySelector(
          '.hover-overlay'
        ) as HTMLElement;
        if (overlay) overlay.style.opacity = '0';
      }}
    >
      <span
        className="hover-overlay absolute inset-0 transition-opacity pointer-events-none"
        style={{
          backgroundColor: 'var(--hover)',
          opacity: 0,
        }}
      />

      {/* Icon - Left */}
      <div className="flex-shrink-0 relative z-10">
        <IconPlus size={36} color="var(--primary)" />
      </div>

      {/* Content - Center/Right */}
      <div className="flex flex-col flex-grow min-w-0 relative z-10">
        <h4
          className="text-base font-bold truncate text-left"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          Create New Template
        </h4>
        <p
          className="text-xs opacity-70 text-left"
          style={{ color: 'var(--on-surface-variant)' }}
        >
          Design a custom theme
        </p>
      </div>
    </button>
  );
}
