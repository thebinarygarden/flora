"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { IconX } from '../icons';
import { useEffect } from 'react';

export interface FullScreenOverlayProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    children: React.ReactNode;
}

export const FullScreenOverlay = ({
    isOpen,
    setIsOpen,
    children
}: FullScreenOverlayProps) => {

    // Prevent body scroll when overlay is open
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

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col"
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--on-background)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Header with Close Button */}
            <div className="flex justify-end pt-5 px-4 lg:px-8 flex-shrink-0">
                <motion.button
                    onClick={() => setIsOpen(false)}
                    className="rounded-md cursor-pointer icon-hover pr-8"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0, duration: 0.2 }}
                >
                    <IconX size={32} />
                </motion.button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto px-4 lg:px-8 pb-8">
                {children}
            </div>
        </motion.div>
    );
};