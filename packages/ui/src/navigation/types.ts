import { ReactNode } from "react";

export type NavItem = {
    label: string;
    href: string;
    active?: boolean;
};

// Common navigation interface that all nav components must implement
export interface NavigationComponentProps {
    brand?: ReactNode;
    items: NavItem[];
    onItemClick?: (item: NavItem) => void;
    className?: string;
}