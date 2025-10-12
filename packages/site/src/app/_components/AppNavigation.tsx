"use client";

import {usePathname, useRouter} from 'next/navigation';
import { BGLanding } from '@flora/ui/core';
import {MobileNav, NavItem} from '@flora/ui/navigation';
import { ReactNode, useEffect } from 'react';

interface AppNavigationProps {
  children: ReactNode;
}

export function AppNavigation({ children }: AppNavigationProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Force scroll to top on navigation
    window.scrollTo(0, 0);
  }, [pathname]);

    const navigationItems: NavItem[] = [
        {label: 'Components', onClick: () => { if (pathname === '/components') return; router.push('/components'); }},
        {label: 'Theme', onClick: () => { if (pathname === '/theme') return; router.push('/theme'); }},
        {label: 'Postcards', onClick: () => { if (pathname === '/postcards') return; router.push('/postcards'); }},
        {label: 'Icons', onClick: () => { if (pathname === '/icons') return; router.push('/icons'); }},
    ];

    const router = useRouter();

    const onBrandClick = () => {
        if (pathname === '/') return;
        router.push('/');
    };

  // Root page uses BGLanding
  if (pathname === '/') {
    return (
      <BGLanding
        title="Flora"
        description="Performance-first React components with forced tree-shaking architecture"
        mp4Path="/newhozions.mp4"
        youtube="https://youtube.com"
        github="https://github.com"
        bgdocs="https://google.com"
        navigationComponent={MobileNav}
        navigationItems={navigationItems}
        onBrandClick={onBrandClick}
      >
        {children}
      </BGLanding>
    );
  }

  // All other pages get standalone MobileNav
  return (
    <>
      <MobileNav
        brand="Flora"
        items={navigationItems}
        onBrandClick={onBrandClick}
      />
      <main className="h-screen">
        {children}
      </main>
    </>
  );
}