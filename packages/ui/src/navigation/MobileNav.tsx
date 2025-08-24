"use client";
import * as React from "react";
import {motion} from "framer-motion";
import {NavigationComponentProps, NavItem} from './types';
import {IconBGLogo, IconMenu} from '../icons';
import {useClientCheck} from "../util/useClientCheck";
import {FullScreenOverlay} from '../display';

export const MobileNav: React.FC<NavigationComponentProps> = ({
                                                                  brand,
                                                                  items,
                                                                  onBrandClick,
                                                                  navOpacity,
                                                              }) => {
    const {isClient} = useClientCheck();
    const [isOpen, setIsOpen] = React.useState(false);

    const finalOpacity = React.useMemo(() => {
        if (isClient) {
            // Client hydrated: use navOpacity if provided (BGLanding), otherwise fade to 1 (standalone)
            return navOpacity !== undefined ? navOpacity : 1;
        }
        // Server render and initial client render: always 0 (no flash)
        return 0;
    }, [isClient, navOpacity]);

    const handleItemClick = (item: NavItem) => {
        item.onClick();
        setIsOpen(false);
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-20`}
                style={{
                    color: 'var(--on-surface)',
                }}
            >
                {/* Animated Background */}
                <motion.div
                    className="absolute inset-0 transition-opacity duration-300 ease-in-out"
                    style={{
                        backgroundColor: 'var(--background)',
                        opacity: finalOpacity,
                    }}
                />
                <div className="relative w-full px-4 lg:px-8">
                    <div className="flex justify-between h-16">
                        {/* Brand/Logo */}
                        <motion.button
                            onClick={onBrandClick}
                            className="flex items-center transition-opacity duration-300 ease-in-out bg-transparent border-none outline-none focus:outline-none cursor-pointer"
                            style={{opacity: finalOpacity}}
                        >
                            <div className="flex-shrink-0 flex items-center gap-2">
                                <IconBGLogo size={32}/>
                                <span className="text-2xl font-bold">{brand}</span>
                            </div>
                        </motion.button>

                        {/* Mobile menu button */}
                        <div className="flex items-center pr-6">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 transition-colors rounded-md cursor-pointer icon-hover"
                                style={{
                                    color: 'var(--on-surface)',
                                }}
                            >
                                {!isOpen && <IconMenu size={32}/>}
                            </button>
                        </div>
                    </div>
                </div>

                <FullScreenOverlay
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                >
                    <div className="flex flex-col items-center justify-center h-full space-y-8 -mt-20">
                        {items.map((item, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className="text-4xl md:text-5xl tracking-wide bg-transparent border-none outline-none focus:outline-none transition-colors rounded-md px-4 py-2"
                                style={{
                                    color: 'var(--on-background)',
                                    fontFamily: 'var(--font-family)',
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
                                    e.currentTarget.style.color = 'var(--primary)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--on-background)';
                                }}
                            >
                                {item.label}
                            </motion.button>
                        ))}
                    </div>
                </FullScreenOverlay>
            </nav>

            {/* Nav Spacer */}
            {!Boolean(navOpacity) && (<div className="w-full h-16"/>)}
        </>
    );
};