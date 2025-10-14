"use client";

import { useState, useRef } from 'react';
import { Theme, saveTemplate } from '@binarygarden/flora/theme';
import { UIPreviewCarousel, previews } from './previews/UIPreviewCarousel';
import { useRouter } from 'next/navigation';
import { useDialog } from '@binarygarden/flora/overlay';
import { IconPaintBrush, IconArrow, IconX, IconCheck } from '@binarygarden/flora/icons';

interface ThemeReviewControlsProps {
    theme: Theme;
    setIsOverlayOpen: (isOpen: boolean) => void;
}

export function ThemeReviewControls({ theme, setIsOverlayOpen }: ThemeReviewControlsProps) {
    const router = useRouter();
    const { showPrompt, showAlert } = useDialog();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLeftHovered, setIsLeftHovered] = useState(false);
    const [isRightHovered, setIsRightHovered] = useState(false);
    const [isPaintbrushHovered, setIsPaintbrushHovered] = useState(false);
    const [isCancelHovered, setIsCancelHovered] = useState(false);
    const [isDoneHovered, setIsDoneHovered] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    // Scroll to content with offset for sticky header
    const scrollToContent = () => {
        if (contentRef.current) {
            const elementPosition = contentRef.current.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - 200;

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
        <section className="mb-16">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--on-background)' }}>
                    Theme Review
                </h2>
                <p className="text-lg opacity-70" style={{ color: 'var(--on-background)' }}>
                    Review your theme across different interfaces to ensure everything looks correct before saving
                </p>
            </div>

            <div className="space-y-6">
                {/* Header with Navigation - Two separate divs */}
                <div className="sticky top-20 z-10 flex items-center gap-3">
                    {/* Left Section: Title, Dots, and Arrows */}
                    <div
                        className="flex-1 flex items-center justify-between gap-4 py-3 px-4 rounded-2xl"
                        style={{ backgroundColor: 'var(--surface)' }}
                    >
                        {/* Title */}
                        <h3 className="text-lg font-semibold" style={{ color: 'var(--on-background)' }}>
                            {currentPreview.title}
                        </h3>

                        {/* Dots Indicator and Navigation Arrows */}
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
                                <button
                                    onClick={goToPrevious}
                                    onMouseEnter={() => setIsLeftHovered(true)}
                                    onMouseLeave={() => setIsLeftHovered(false)}
                                    className="cursor-pointer p-2 rounded-lg transition-all duration-200"
                                    style={{
                                        color: isLeftHovered ? 'var(--on-secondary)' : 'var(--secondary)',
                                        backgroundColor: isLeftHovered ? 'var(--secondary)' : 'var(--surface)',
                                        border: isLeftHovered ? 'none' : '1px solid var(--border)'
                                    }}
                                    aria-label="Previous preview"
                                >
                                    <IconArrow size={24} orientation="left" />
                                </button>
                                <button
                                    onClick={goToNext}
                                    onMouseEnter={() => setIsRightHovered(true)}
                                    onMouseLeave={() => setIsRightHovered(false)}
                                    className="cursor-pointer p-2 rounded-lg transition-all duration-200"
                                    style={{
                                        color: isRightHovered ? 'var(--on-secondary)' : 'var(--secondary)',
                                        backgroundColor: isRightHovered ? 'var(--secondary)' : 'var(--surface)',
                                        border: isRightHovered ? 'none' : '1px solid var(--border)'
                                    }}
                                    aria-label="Next preview"
                                >
                                    <IconArrow size={24} orientation="right" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Divider, Paintbrush, Cancel, and Done Button */}
                    <div
                        className="flex items-center gap-3 py-3 px-4 rounded-2xl"
                        style={{ backgroundColor: 'var(--surface)' }}
                    >
                        {/* Divider */}
                        <div style={{ height: '40px', width: '1px', backgroundColor: 'var(--border)' }} />

                        {/* Paintbrush Icon */}
                        <button
                            onClick={() => setIsOverlayOpen(true)}
                            onMouseEnter={() => setIsPaintbrushHovered(true)}
                            onMouseLeave={() => setIsPaintbrushHovered(false)}
                            className="cursor-pointer p-2 rounded-lg transition-all duration-200"
                            style={{
                                color: isPaintbrushHovered ? 'var(--on-tertiary)' : 'var(--tertiary)',
                                backgroundColor: isPaintbrushHovered ? 'var(--tertiary)' : 'var(--surface)',
                                border: isPaintbrushHovered ? 'none' : '1px solid var(--border)'
                            }}
                            aria-label="Open theme editor"
                        >
                            <IconPaintBrush size={24} />
                        </button>

                        {/* Cancel Button */}
                        <button
                            onClick={() => router.push('/theme')}
                            onMouseEnter={() => setIsCancelHovered(true)}
                            onMouseLeave={() => setIsCancelHovered(false)}
                            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
                            style={{
                                color: isCancelHovered ? 'var(--on-error)' : 'var(--error)',
                                backgroundColor: isCancelHovered ? 'var(--error)' : 'var(--surface)',
                                border: isCancelHovered ? 'none' : '1px solid var(--border)'
                            }}
                            aria-label="Cancel"
                        >
                            <IconX size={24} />
                            <span className="font-medium">Cancel</span>
                        </button>

                        {/* Done Button */}
                        <button
                            onClick={() => {
                                showPrompt(
                                    'Enter a name for this theme template:',
                                    (name) => {
                                        try {
                                            saveTemplate(theme, name, 190);
                                            router.push('/theme');
                                        } catch {
                                            showAlert('Error saving template. Please try again.');
                                        }
                                    },
                                    '',
                                );
                            }}
                            onMouseEnter={() => setIsDoneHovered(true)}
                            onMouseLeave={() => setIsDoneHovered(false)}
                            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200"
                            style={{
                                color: isDoneHovered ? 'var(--on-primary)' : 'var(--primary)',
                                backgroundColor: isDoneHovered ? 'var(--primary)' : 'var(--surface)',
                                border: isDoneHovered ? 'none' : '1px solid var(--border)'
                            }}
                            aria-label="Done"
                        >
                            <IconCheck size={24} />
                            <span className="font-semibold">Done</span>
                        </button>
                    </div>
                </div>

                {/* Preview Content */}
                <div ref={contentRef}>
                    <UIPreviewCarousel currentIndex={currentIndex} />
                </div>
            </div>
        </section>
    );
}
