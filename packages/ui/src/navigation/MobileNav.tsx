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
                                                                  onItemClick,
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
        if (onItemClick) {
            onItemClick(item);
        }
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
                <div className="relative w-full sm:px-4 lg:px-8">
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
                                className="p-2 transition-colors rounded-md cursor-pointer"
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
                    items={items}
                    onItemClick={handleItemClick}
                />
            </nav>

            {/* Nav Spacer */}
            {!Boolean(navOpacity) && (<div className="w-full h-16"/>)}
        </>
    );
};