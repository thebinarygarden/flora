"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { IconX } from '../icons';

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

    if (!isOpen) return null;

    return (
        <motion.div
            className="fixed inset-0 z-50"
            style={{
                backgroundColor: 'var(--background)',
                color: 'var(--on-background)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Close Button */}
            <div className="flex justify-end pt-5 px-4 lg:px-8">
                <motion.button
                    onClick={() => setIsOpen(false)}
                    className="transition-colors rounded-md cursor-pointer icon-hover pr-8"
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0, duration: 0.2 }}
                >
                    <IconX size={32} />
                </motion.button>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center justify-center h-full -mt-20">
                {children}
            </div>
        </motion.div>
    );
};