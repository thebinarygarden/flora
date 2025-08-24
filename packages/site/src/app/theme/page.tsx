import { ThemeInteractiveSection } from '@/pages/theme/ThemeInteractiveSection';

export default function ThemePage() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--on-background)'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Static Header */}
        <h1 className="text-3xl font-bold mb-8">Theme Picker</h1>
        
        {/* Interactive Section - Client Component */}
        <ThemeInteractiveSection />
      </div>
    </div>
  );
}