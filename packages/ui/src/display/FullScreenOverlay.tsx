"use client";
import * as React from "react";
import { motion } from "framer-motion";
import { IconX } from '../icons';
import {NavItem} from "../navigation";

export interface FullScreenOverlayProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    items: NavItem[];
    onItemClick: (item: NavItem) => void;
}

export const FullScreenOverlay = ({
    isOpen,
    setIsOpen,
    items,
    onItemClick
}: FullScreenOverlayProps) => {
    const handleItemClick = (item: NavItem) => {
        onItemClick(item);
        setIsOpen(false);
    };

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
            <div className="flex justify-end pt-5 pr-8">
                <motion.button
                    onClick={() => setIsOpen(false)}
                    className="sm:px-4 lg:px-8 transition-colors rounded-md cursor-pointer"
                    style={{
                        color: 'var(--on-background)',
                    }}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0, duration: 0.2 }}
                >
                    <IconX size={32} />
                </motion.button>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col items-center justify-center h-full space-y-8 -mt-20">
                {items.map((item, index) => (
                    <motion.button
                        key={index}
                        onClick={() => handleItemClick(item)}
                        className="text-4xl md:text-5xl tracking-wide bg-transparent border-none outline-none focus:outline-none transition-colors rounded-md px-4 py-2"
                        style={{
                            color: item.active ? 'var(--primary)' : 'var(--on-background)',
                            fontFamily: 'var(--font-family)',
                            opacity: item.active ? 0.7 : 1,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: (index * 0.1),
                            duration: 0.2,
                            ease: "easeOut"
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={(e) => {
                            if (!item.active) {
                                e.currentTarget.style.color = 'var(--primary)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!item.active) {
                                e.currentTarget.style.color = 'var(--on-background)';
                            }
                        }}
                    >
                        {item.label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};