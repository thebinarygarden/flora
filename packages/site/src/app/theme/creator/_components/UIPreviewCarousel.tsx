"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from '@flora/ui/input';
import { IconPaintBrush } from '@flora/ui/icons';
import { LandingPageShowcase } from './LandingPageShowcase';
import { DashboardShowcase } from './DashboardShowcase';
import { ProfilePageShowcase } from './ProfilePageShowcase';

interface UIPreviewCarouselProps {
    setIsOverlayOpen: (isOpen: boolean) => void;
}

export function UIPreviewCarousel({ setIsOverlayOpen }: UIPreviewCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    const previews = [
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
        }
    ];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? previews.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === previews.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Scroll to content with offset for sticky header
    useEffect(() => {
        if (contentRef.current) {
            const elementPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 200; // Offset for navbar + sticky header + padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }, [currentIndex]);

    const currentPreview = previews[currentIndex];

    return (
        <div className="space-y-6">
            {/* Header with Navigation - Sticky */}
            <div
                className="sticky top-20 z-10 flex items-center justify-between bg-gray-100 p-4 rounded-2xl"
                style={{ backgroundColor: 'var(--surface)' }}
            >
                <div>
                    <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--on-background)' }}>
                        {currentPreview.title}
                    </h3>
                    <p className="text-sm opacity-70" style={{ color: 'var(--on-background)' }}>
                        {currentPreview.description}
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    {/* Paintbrush Icon */}
                    <button
                        onClick={() => setIsOverlayOpen(true)}
                        className="cursor-pointer icon-hover p-2 rounded-lg transition-colors"
                        style={{
                            color: 'var(--on-surface)',
                            backgroundColor: 'var(--background)'
                        }}
                        aria-label="Open theme editor"
                    >
                        <IconPaintBrush size={24} />
                    </button>

                    {/* Dots Indicator */}
                    <div className="flex justify-center gap-2 pt-4">
                        {previews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className="transition-all duration-300"
                                style={{
                                    width: currentIndex === index ? '32px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    backgroundColor: currentIndex === index
                                        ? 'var(--primary)'
                                        : 'var(--border)',
                                    cursor: 'pointer'
                                }}
                                aria-label={`Go to ${previews[index].title}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={goToPrevious}
                            className="px-3 py-2"
                        >
                            ←
                        </Button>
                        <Button
                            variant="primary"
                            onClick={goToNext}
                            className="px-3 py-2"
                        >
                            →
                        </Button>
                    </div>
                </div>
            </div>

            {/* Preview Content */}
            <div ref={contentRef} className="transition-opacity duration-300">
                {currentPreview.component}
            </div>
        </div>
    );
}
