"use client";

import { Card, Badge } from '@binarygarden/flora/ui';
import { Button } from '@binarygarden/flora/form';
import { useState } from 'react';

export function NotificationsShowcase() {
    const [showToast, setShowToast] = useState(true);

    return (
        <Card variant="flat" padding="large">
            <div className="space-y-8">
                {/* Page Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-3" style={{ color: 'var(--on-background)' }}>
                        Notifications & Alerts
                    </h2>
                    <p className="text-lg opacity-70" style={{ color: 'var(--on-background)' }}>
                        Comprehensive showcase of semantic colors in messaging contexts
                    </p>
                </div>

                {/* Banner Alerts Section */}
                <Card variant="outlined" padding="medium">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
                        Banner Alerts
                    </h3>
                    <div className="space-y-3">
                        {/* Info Banner */}
                        <div
                            className="p-4 rounded-lg flex items-start gap-3"
                            style={{
                                backgroundColor: 'var(--info)',
                                color: 'var(--on-info)'
                            }}
                        >
                            <span className="text-xl flex-shrink-0">ℹ️</span>
                            <div className="flex-1">
                                <p className="font-semibold mb-1">New Features Available</p>
                                <p className="text-sm opacity-90">
                                    We've added dark mode support and improved performance.
                                    <a
                                        href="#"
                                        className="underline font-medium ml-1 hover:opacity-80"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        View changelog
                                    </a>
                                </p>
                            </div>
                            <button className="text-sm opacity-70 hover:opacity-100">✕</button>
                        </div>

                        {/* Highlight Banner */}
                        <div
                            className="p-4 rounded-lg flex items-start gap-3"
                            style={{
                                backgroundColor: 'var(--highlight)',
                                color: 'var(--on-highlight)'
                            }}
                        >
                            <span className="text-xl flex-shrink-0">⭐</span>
                            <div className="flex-1">
                                <p className="font-semibold mb-1">Limited Time Offer: 50% Off Premium</p>
                                <p className="text-sm opacity-90">
                                    Upgrade to Premium today and save 50%. Offer ends in 48 hours!
                                </p>
                            </div>
                            <Badge variant="warning" size="small">Ends Soon</Badge>
                        </div>

                        {/* Neutral Banner */}
                        <div
                            className="p-4 rounded-lg flex items-start gap-3"
                            style={{
                                backgroundColor: 'var(--neutral)',
                                color: 'var(--on-neutral)'
                            }}
                        >
                            <span className="text-xl flex-shrink-0">📢</span>
                            <div className="flex-1">
                                <p className="font-semibold mb-1">System Maintenance Scheduled</p>
                                <p className="text-sm opacity-90">
                                    Routine maintenance will occur Saturday 2-4 AM EST. No action needed.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Inline Notifications */}
                <Card variant="outlined" padding="medium">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
                        Inline Notifications
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Info Card */}
                        <div
                            className="p-4 rounded-lg border-l-4"
                            style={{
                                backgroundColor: 'var(--surface)',
                                borderLeftColor: 'var(--info)'
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <span style={{ color: 'var(--info)' }}>ℹ️</span>
                                <div>
                                    <p className="font-medium mb-1" style={{ color: 'var(--on-surface)' }}>
                                        Pro Tip
                                    </p>
                                    <p className="text-sm opacity-80" style={{ color: 'var(--on-surface)' }}>
                                        Use keyboard shortcuts to navigate faster. Press{' '}
                                        <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: 'var(--background)' }}>
                                            ?
                                        </kbd>{' '}
                                        to see all shortcuts.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Neutral Card */}
                        <div
                            className="p-4 rounded-lg border-l-4"
                            style={{
                                backgroundColor: 'var(--surface)',
                                borderLeftColor: 'var(--neutral)'
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <span style={{ color: 'var(--neutral)' }}>📋</span>
                                <div>
                                    <p className="font-medium mb-1" style={{ color: 'var(--on-surface)' }}>
                                        Draft Saved
                                    </p>
                                    <p className="text-sm opacity-80" style={{ color: 'var(--on-surface)' }}>
                                        Your changes have been automatically saved as a draft.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Highlight Card */}
                        <div
                            className="p-4 rounded-lg border-l-4"
                            style={{
                                backgroundColor: 'var(--highlight)',
                                borderLeftColor: 'var(--on-highlight)'
                            }}
                        >
                            <div className="flex items-start gap-3">
                                <span style={{ color: 'var(--on-highlight)' }}>✨</span>
                                <div>
                                    <p className="font-medium mb-1" style={{ color: 'var(--on-highlight)' }}>
                                        Featured Content
                                    </p>
                                    <p className="text-sm opacity-90" style={{ color: 'var(--on-highlight)' }}>
                                        This item is highlighted because it matches your interests.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Toast/Snackbar Examples */}
                <Card variant="outlined" padding="medium">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
                        Surface Variant (Toasts & Tooltips)
                    </h3>
                    <div className="space-y-6">
                        <p className="text-sm opacity-70" style={{ color: 'var(--on-surface)' }}>
                            These elements use variant surface colors for emphasis and contrast
                        </p>

                        {/* Toast Examples */}
                        <div className="flex flex-wrap gap-4">
                            {showToast && (
                                <div
                                    className="inline-flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl"
                                    style={{
                                        backgroundColor: 'var(--surface-variant)',
                                        color: 'var(--on-surface-variant)'
                                    }}
                                >
                                    <span>✓</span>
                                    <span className="text-sm font-medium">File uploaded successfully</span>
                                    <button
                                        onClick={() => setShowToast(false)}
                                        className="ml-2 opacity-70 hover:opacity-100"
                                    >
                                        ✕
                                    </button>
                                </div>
                            )}

                            <div
                                className="inline-flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl"
                                style={{
                                    backgroundColor: 'var(--surface-variant)',
                                    color: 'var(--on-surface-variant)'
                                }}
                            >
                                <span>🔄</span>
                                <span className="text-sm font-medium">Syncing changes...</span>
                            </div>

                            <div
                                className="inline-flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl"
                                style={{
                                    backgroundColor: 'var(--surface-variant)',
                                    color: 'var(--on-surface-variant)'
                                }}
                            >
                                <span>📥</span>
                                <span className="text-sm font-medium">3 new messages</span>
                                <button className="ml-2 text-xs px-2 py-1 rounded opacity-80 hover:opacity-100"
                                    style={{
                                        backgroundColor: 'var(--on-surface-variant)',
                                        color: 'var(--surface-variant)'
                                    }}
                                >
                                    View
                                </button>
                            </div>
                        </div>

                        {/* Tooltip Example */}
                        <div className="relative inline-block group">
                            <Button variant="primary">
                                Hover for Tooltip
                            </Button>
                            <div
                                className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none"
                                style={{
                                    backgroundColor: 'var(--surface-variant)',
                                    color: 'var(--on-surface-variant)'
                                }}
                            >
                                <span className="text-sm">This is a helpful tooltip</span>
                                <div
                                    className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0"
                                    style={{
                                        borderLeft: '6px solid transparent',
                                        borderRight: '6px solid transparent',
                                        borderTop: '6px solid var(--surface-variant)'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Status Badges */}
                <Card variant="outlined" padding="medium">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
                        Status Indicators & Badges
                    </h3>
                    <div className="space-y-6">
                        {/* System Status */}
                        <div>
                            <h4 className="text-sm font-medium mb-3 opacity-70" style={{ color: 'var(--on-surface)' }}>
                                System Status
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="success" size="small">✓ Operational</Badge>
                                <Badge variant="info" size="small">ℹ️ Maintenance Soon</Badge>
                                <Badge variant="warning" size="small">⚠️ Degraded</Badge>
                                <Badge variant="error" size="small">✕ Outage</Badge>
                                <Badge variant="neutral" size="small">● Unknown</Badge>
                            </div>
                        </div>

                        {/* Priority Levels */}
                        <div>
                            <h4 className="text-sm font-medium mb-3 opacity-70" style={{ color: 'var(--on-surface)' }}>
                                Priority Levels
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="error" size="medium">P0 - High</Badge>
                                <Badge variant="warning" size="medium">P1 - Medium</Badge>
                                <Badge variant="info" size="medium">P2 - Low</Badge>
                                <Badge variant="neutral" size="medium">P3 - Backlog</Badge>
                            </div>
                        </div>

                        {/* Feature Badges */}
                        <div>
                            <h4 className="text-sm font-medium mb-3 opacity-70" style={{ color: 'var(--on-surface)' }}>
                                Feature Highlights
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="highlight" size="small">NEW</Badge>
                                <Badge variant="highlight" size="small">FEATURED</Badge>
                                <Badge variant="highlight" size="small">RECOMMENDED</Badge>
                                <Badge variant="info" size="small">BETA</Badge>
                                <Badge variant="success" size="small">POPULAR</Badge>
                                <Badge variant="primary" size="small">PRO</Badge>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Link-Heavy Content */}
                <Card variant="outlined" padding="medium">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--on-surface)' }}>
                        Links & Navigation
                    </h3>
                    <div className="space-y-4">
                        {/* Paragraph with links */}
                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: 'var(--background)' }}
                        >
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--on-background)' }}>
                                Welcome to our platform! To get started,{' '}
                                <a
                                    href="#"
                                    className="font-medium underline hover:opacity-80"
                                    style={{ color: 'var(--link)' }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    read our documentation
                                </a>
                                , watch the{' '}
                                <a
                                    href="#"
                                    className="font-medium underline hover:opacity-80"
                                    style={{ color: 'var(--link)' }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    tutorial videos
                                </a>
                                , or{' '}
                                <a
                                    href="#"
                                    className="font-medium underline hover:opacity-80"
                                    style={{ color: 'var(--link)' }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    contact support
                                </a>
                                {' '}if you need help. You can also{' '}
                                <a
                                    href="#"
                                    className="font-medium underline hover:opacity-80"
                                    style={{ color: 'var(--link)' }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    explore our API
                                </a>
                                {' '}or{' '}
                                <a
                                    href="#"
                                    className="font-medium underline hover:opacity-80"
                                    style={{ color: 'var(--link)' }}
                                    onClick={(e) => e.preventDefault()}
                                >
                                    join our community
                                </a>
                                .
                            </p>
                        </div>

                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--on-surface)' }}>
                            <a
                                href="#"
                                className="hover:underline"
                                style={{ color: 'var(--link)' }}
                                onClick={(e) => e.preventDefault()}
                            >
                                Home
                            </a>
                            <span className="opacity-50">/</span>
                            <a
                                href="#"
                                className="hover:underline"
                                style={{ color: 'var(--link)' }}
                                onClick={(e) => e.preventDefault()}
                            >
                                Documentation
                            </a>
                            <span className="opacity-50">/</span>
                            <a
                                href="#"
                                className="hover:underline"
                                style={{ color: 'var(--link)' }}
                                onClick={(e) => e.preventDefault()}
                            >
                                Components
                            </a>
                            <span className="opacity-50">/</span>
                            <span className="opacity-70">Badge</span>
                        </div>

                        {/* Footer Links */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                            <div>
                                <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--on-surface)' }}>
                                    Product
                                </h5>
                                <div className="space-y-1">
                                    {['Features', 'Pricing', 'Roadmap', 'Updates'].map(link => (
                                        <a
                                            key={link}
                                            href="#"
                                            className="block text-sm hover:underline"
                                            style={{ color: 'var(--link)' }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--on-surface)' }}>
                                    Resources
                                </h5>
                                <div className="space-y-1">
                                    {['Documentation', 'Tutorials', 'API Reference', 'Community'].map(link => (
                                        <a
                                            key={link}
                                            href="#"
                                            className="block text-sm hover:underline"
                                            style={{ color: 'var(--link)' }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--on-surface)' }}>
                                    Company
                                </h5>
                                <div className="space-y-1">
                                    {['About', 'Blog', 'Careers', 'Press'].map(link => (
                                        <a
                                            key={link}
                                            href="#"
                                            className="block text-sm hover:underline"
                                            style={{ color: 'var(--link)' }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h5 className="text-sm font-semibold mb-2" style={{ color: 'var(--on-surface)' }}>
                                    Legal
                                </h5>
                                <div className="space-y-1">
                                    {['Privacy', 'Terms', 'Security', 'Compliance'].map(link => (
                                        <a
                                            key={link}
                                            href="#"
                                            className="block text-sm hover:underline"
                                            style={{ color: 'var(--link)' }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            {link}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Card>
    );
}
