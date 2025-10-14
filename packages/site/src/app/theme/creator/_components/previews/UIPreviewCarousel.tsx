"use client";

import { LandingPageShowcase } from './LandingPageShowcase';
import { DashboardShowcase } from './DashboardShowcase';
import { ProfilePageShowcase } from './ProfilePageShowcase';
import { NotificationsShowcase } from './NotificationsShowcase';

interface UIPreviewCarouselProps {
    currentIndex: number;
}

export const previews = [
    {
        id: 'landing',
        title: '🌟 Landing Page',
        description: 'Marketing site with hero, features, testimonials, and pricing',
        component: <LandingPageShowcase />
    },
    {
        id: 'dashboard',
        title: '📊 Dashboard',
        description: 'Data-heavy interface with stats, charts, and activity feeds',
        component: <DashboardShowcase />
    },
    {
        id: 'profile',
        title: '👤 Profile Page',
        description: 'User profile with tabs, skills, projects, and achievements',
        component: <ProfilePageShowcase />
    },
    {
        id: 'notifications',
        title: '🔔 Notifications & Alerts',
        description: 'Comprehensive semantic colors in alerts, toasts, and messaging',
        component: <NotificationsShowcase />
    }
];

export function UIPreviewCarousel({ currentIndex }: UIPreviewCarouselProps) {
    const currentPreview = previews[currentIndex];

    return (
        <div className="transition-opacity duration-300">
            {currentPreview.component}
        </div>
    );
}
