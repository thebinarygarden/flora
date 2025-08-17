"use client";
import {useRouter} from 'next/navigation';
import { type NavItem} from '@flora/ui/navigation';

export const useNavigationConfig = (): {
    navigationItems: NavItem[];
    onNavigationItemClick: (item: NavItem) => void;
    onBrandClick: () => void;
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

    const handleBrandClick = () => {
        router.push('/');
    };

    return {
        navigationItems: navigationItems,
        onNavigationItemClick: handleNavItemClick,
        onBrandClick: handleBrandClick
    };
};