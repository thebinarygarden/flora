"use client";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from '../icons';
import { useEffect } from 'react';

export interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    showCloseButton?: boolean;
    closeOnBackdropClick?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Dialog = ({
    isOpen,
    onClose,
    children,
    title,
    showCloseButton = false,
    closeOnBackdropClick = true,
    maxWidth = 'md'
}: DialogProps) => {

    // Prevent body scroll when dialog is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl'
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        style={{ opacity: 0.5 }}
                        onClick={closeOnBackdropClick ? onClose : undefined}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Dialog Content */}
                    <motion.div
                        className={`relative w-full ${maxWidthClasses[maxWidth]} rounded-lg`}
                        style={{
                            backgroundColor: 'var(--surface)',
                            color: 'var(--on-surface)',
                            border: '1px solid var(--border)',
                        }}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        {(title || showCloseButton) && (
                            <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--border)' }}>
                                {title && (
                                    <h2 className="text-xl font-semibold" style={{ color: 'var(--on-surface)' }}>
                                        {title}
                                    </h2>
                                )}
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="ml-auto rounded-md transition-opacity hover:opacity-70"
                                        style={{ color: 'var(--on-surface)' }}
                                        aria-label="Close dialog"
                                    >
                                        <IconX size={24} />
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Content */}
                        <div className="p-6">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
