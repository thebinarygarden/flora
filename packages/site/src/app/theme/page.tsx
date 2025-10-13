'use client';

import { TemplateGallery, loadTemplates, deleteTemplate } from '@binarygarden/flora/theme';
import { useRouter } from 'next/navigation';

export default function ThemePage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: 'var(--background)',
        color: 'var(--on-background)'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3">Theme Templates</h1>
          <p className="text-lg opacity-70">
            Create and manage your custom theme templates
          </p>
        </div>

        {/* Template Gallery - Client Component */}
        <TemplateGallery
          loadTemplates={loadTemplates}
          deleteTemplate={deleteTemplate}
          onCreateNew={() => router.push('/theme/creator')}
        />
      </div>
    </div>
  );
}