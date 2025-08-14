"use client";
import * as React from "react";
import {motion} from "framer-motion";
import {NavigationComponentProps, NavItem} from './types';
import { useTheme } from '../theme';

export interface MobileNavProps extends NavigationComponentProps {
}

export const MobileNav: React.FC<MobileNavProps> = ({
                                                        brand,
                                                        items,
                                                        onItemClick,
                                                        className = '',
                                                    }) => {
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);

    const handleItemClick = (item: NavItem) => {
        if (onItemClick) {
            onItemClick(item);
        }
        setIsOpen(false);
    };

    return (
        <nav className={`bg-white shadow-md ${className}`}>
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Brand/Logo */}
                    <div className="flex items-center">
                        {brand && (
                            <div className="flex-shrink-0">
                                {brand}
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-label="Open navigation menu"
                        >
                            {!isOpen &&
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                </svg>}
                        </button>
                    </div>
                </div>
            </div>

            {/* Full Page Mobile Navigation Menu */}
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-white dark:bg-gray-900"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.3}}
                >
                    {/* Close Button */}
                    <div className="flex justify-end p-6">
                        <motion.button
                            onClick={() => setIsOpen(false)}
                            className="p-2 transition-colors"
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{delay: 0.1, duration: 0.3}}
                        >
                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </motion.button>
                    </div>

                    {/* Navigation Items */}
                    <div className="flex flex-col items-center justify-center h-full space-y-8 -mt-20">
                        {items.map((item, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className={`text-4xl md:text-5xl tracking-wide bg-transparent border-none outline-none focus:outline-none ${
                                    item.active
                                        ? 'opacity-50'
                                        : ''
                                }`}
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{
                                    delay: (index * 0.1),
                                    duration: 0.2,
                                    ease: "easeOut"
                                }}
                                whileHover={{scale: 1.05}}
                                whileTap={{scale: 0.95}}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};