"use client";

import {usePathname, useRouter} from 'next/navigation';
import { BGLanding } from '@flora/ui/core';
import {MobileNav, NavItem} from '@flora/ui/navigation';
import { ReactNode } from 'react';

interface AppNavigationProps {
  children: ReactNode;
}

export function AppNavigation({ children }: AppNavigationProps) {
  const pathname = usePathname();
    const navigationItems = [
        {label: 'Components', href: '/components', active: false},
        {label: 'Theme', href: '/theme', active: false},
        {label: 'Postcards', href: '/postcards', active: false},
        {label: 'Icons', href: '/icons', active: false},
    ];

    const router = useRouter();
    const onNavigationItemClick = (item: NavItem) => {
        router.push(item.href);
    };

    const onBrandClick = () => {
        router.push('/');
    };

  // Root page uses BGLanding
  if (pathname === '/') {
    return (
      <BGLanding 
        title="Flora"
        description="Performance-first React components with forced tree-shaking architecture"
        mp4Path="newhozions.mp4"
        youtube="https://youtube.com"
        github="https://github.com"
        bgdocs="https://google.com"
        navigationComponent={MobileNav}
        navigationItems={navigationItems}
        onNavigationItemClick={onNavigationItemClick}
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
        onItemClick={onNavigationItemClick}
        onBrandClick={onBrandClick}
      />
      <main className="h-screen">
        {children}
      </main>
    </>
  );
}