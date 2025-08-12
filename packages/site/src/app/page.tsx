"use client";
import { BGLanding } from '@flora/ui/core';
import { useNavigationConfig } from '@/hooks/useNavigationConfig';

export default function Home() {
  const { navigationComponent, navigationItems, onNavigationItemClick } = useNavigationConfig();

  return (
    <main>
      <BGLanding 
        title="Flora"
        mp4Path="newhozions.mp4"
        youtube="https://youtube.com"
        github="https://github.com"
        bgdocs="https://google.com"
        navigationComponent={navigationComponent}
        navigationItems={navigationItems}
        onNavigationItemClick={onNavigationItemClick}
      >
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Welcome to Flora</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Performance-first React components with forced tree-shaking
          </p>
          <div className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-4">Component Architecture</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Flora is designed around tree-shakable, performance-first component architecture with selective imports.
              </p>
            </section>
          </div>
        </div>
      </BGLanding>
    </main>
  );
}
