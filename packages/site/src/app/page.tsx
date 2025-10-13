import { Button } from '@binarygarden/flora/input';
import { IconBGLogo } from '@binarygarden/flora/icons';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold">Welcome to Flora</h2>
        <IconBGLogo size={24} color="#ec4899" />
      </div>
      <p 
        className="text-lg mb-8"
        style={{ color: 'var(--on-surface)' }}
      >
        Performance-first React components with forced tree-shaking
      </p>

      {/* Button Variants Section */}
      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-6">Button Variants</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-lg font-medium mb-3">Primary Buttons</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="primary" disabled>Primary Disabled</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">Secondary Buttons</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="secondary" disabled>Secondary Disabled</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">Tertiary Buttons</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="tertiary">Tertiary Button</Button>
              <Button variant="tertiary" disabled>Tertiary Disabled</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-3">Outline Buttons</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline">Outline Button</Button>
              <Button variant="outline" disabled>Outline Disabled</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-4">Component Architecture</h3>
          <p style={{ color: 'var(--on-surface)' }}>
            Flora is designed around tree-shakable, performance-first component architecture with selective imports.
          </p>
        </section>
      </div>
    </div>
  );
}
