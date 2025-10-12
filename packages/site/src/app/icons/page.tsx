import { ThemeToggleButton } from 'bgflora/theme';
import { IconsInteractiveSection } from '@/app/icons/_components/IconsInteractiveSection';

export default function IconsPage() {
  return (
    <div className="max-w-6xl mx-auto p-8" style={{ backgroundColor: 'var(--background)', color: 'var(--on-background)' }}>
      <header className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold" style={{ color: 'var(--on-background)' }}>Flora Icons</h1>
          <ThemeToggleButton />
        </div>
        <p className="text-xl leading-relaxed" style={{ color: 'var(--on-background)', opacity: 0.8 }}>
          SVG icon collection with customizable properties for modern applications
        </p>
      </header>

      <IconsInteractiveSection />
    </div>
  );
}