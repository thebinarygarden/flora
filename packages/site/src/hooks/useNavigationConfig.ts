"use client";
import {useRouter} from 'next/navigation';
import {MobileNav, type NavItem} from '@flora/ui/navigation';
import {ComponentType} from 'react';
import {NavigationComponentProps} from '@flora/ui/navigation';

export const useNavigationConfig = (): {
    navigationComponent: ComponentType<NavigationComponentProps>;
    navigationItems: NavItem[];
    onNavigationItemClick: (item: NavItem) => void;
} => {
    const navigationItems = [
        {label: 'Components', href: '/components', active: false},
        {label: 'Theme', href: '/theme', active: false},
        {label: 'Postcards', href: '/postcards', active: false},
        {label: 'Icons', href: '/icons', active: false},
    ];

    const router = useRouter();
    const handleNavItemClick = (item: NavItem) => {
        router.push(item.href);
    };

    return {
        navigationComponent: MobileNav,
        navigationItems: navigationItems,
        onNavigationItemClick: handleNavItemClick
    };
};