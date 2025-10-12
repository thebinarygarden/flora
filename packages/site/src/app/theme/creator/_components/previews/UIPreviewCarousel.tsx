"use client";

import { useState, useRef } from 'react';
import { Button } from 'bgflora/input';
import { IconPaintBrush } from 'bgflora/icons';
import { LandingPageShowcase } from './LandingPageShowcase';
import { DashboardShowcase } from './DashboardShowcase';
import { ProfilePageShowcase } from './ProfilePageShowcase';

interface UIPreviewCarouselProps {
    setIsOverlayOpen: (isOpen: boolean) => void;
    onSave: () => void;
    onCancel: () => void;
}

export function UIPreviewCarousel({ setIsOverlayOpen, onSave, onCancel }: UIPreviewCarouselProps) {
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

    // Scroll to content with offset for sticky header
    const scrollToContent = () => {
        if (contentRef.current) {
            const elementPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 200; // Offset for navbar + sticky header + padding

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? previews.length - 1 : prevIndex - 1
        );
        scrollToContent();
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === previews.length - 1 ? 0 : prevIndex + 1
        );
        scrollToContent();
    };

    const currentPreview = previews[currentIndex];

    return (
        <div className="space-y-6">
            {/* Header with Navigation - Sticky - Two separate divs */}
            <div className="sticky top-20 z-10 flex items-center gap-3">
                {/* Left Section: Title, Dots, and Arrows - Single line */}
                <div
                    className="flex-1 flex items-center justify-between gap-4 py-3 px-4 rounded-2xl"
                    style={{ backgroundColor: 'var(--surface)' }}
                >
                    {/* Title */}
                    <h3 className="text-lg font-semibold" style={{ color: 'var(--on-background)' }}>
                        {currentPreview.title}
                    </h3>

                    {/* Dots Indicator and Navigation Arrows - Same line */}
                    <div className="flex items-center gap-3">
                        {/* Dots Indicator */}
                        <div className="flex gap-2">
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

                        {/* Navigation Arrows */}
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

                {/* Right Section: Paintbrush, Cancel, and Done Button */}
                <div
                    className="flex items-center gap-3 py-3 px-4 rounded-2xl"
                    style={{ backgroundColor: 'var(--surface)' }}
                >
                    {/* Paintbrush Icon */}
                    <button
                        onClick={() => setIsOverlayOpen(true)}
                        className="cursor-pointer icon-hover p-2 rounded-lg"
                        style={{
                            color: 'var(--on-surface)',
                            backgroundColor: 'var(--surface)',
                            border: '1px solid var(--border)'
                        }}
                        aria-label="Open theme editor"
                    >
                        <IconPaintBrush size={24} />
                    </button>

                    {/* Cancel Button */}
                    <Button
                        variant="secondary"
                        onClick={onCancel}
                        className="px-6 py-2.5"
                    >
                        Cancel
                    </Button>

                    {/* Done Button */}
                    <Button
                        variant="primary"
                        onClick={onSave}
                        className="px-6 py-2.5 font-semibold"
                    >
                        Done
                    </Button>
                </div>
            </div>

            {/* Preview Content */}
            <div ref={contentRef} className="transition-opacity duration-300">
                {currentPreview.component}
            </div>
        </div>
    );
}
