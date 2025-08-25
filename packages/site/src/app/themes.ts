import { Theme } from '@flora/ui/theme';

export const lightTheme: Theme = {
  // Brand colors
  primary: '#2563eb',        // blue-600
  onPrimary: '#ffffff',      // white
  secondary: '#6b7280',      // gray-500 
  onSecondary: '#ffffff',    // white
  tertiary: '#7c3aed',       // violet-600
  onTertiary: '#ffffff',     // white
  
  // Surface hierarchy
  background: '#ffffff',     // white
  onBackground: '#111827',   // gray-900
  surface: '#f9fafb',        // gray-50
  onSurface: '#374151',      // gray-700
  
  // Interactive states
  border: '#d1d5db',         // gray-300
  hover: '#2563eb',          // primary with opacity applied in components
  focus: '#3b82f6',          // blue-500
  disabled: '#f3f4f6',       // gray-100
  onDisabled: '#9ca3af',     // gray-400
  
  // Semantic states
  error: '#dc2626',          // red-600
  onError: '#ffffff',        // white
  success: '#16a34a',        // green-600
  onSuccess: '#ffffff',      // white
  warning: '#ca8a04',        // yellow-600
  onWarning: '#ffffff'       // white
};

export const darkTheme: Theme = {
  // Brand colors
  primary: '#3b82f6',        // blue-500 (brighter for dark)
  onPrimary: '#ffffff',      // white
  secondary: '#9ca3af',      // gray-400 (lighter for dark)
  onSecondary: '#111827',    // gray-900
  tertiary: '#8b5cf6',       // violet-500 (brighter for dark)
  onTertiary: '#ffffff',     // white
  
  // Surface hierarchy
  background: '#0f172a',     // slate-900
  onBackground: '#f1f5f9',   // slate-100
  surface: '#1e293b',        // slate-800
  onSurface: '#cbd5e1',      // slate-300
  
  // Interactive states
  border: '#475569',         // slate-600
  hover: '#3b82f6',          // primary with opacity applied in components
  focus: '#60a5fa',          // blue-400
  disabled: '#334155',       // slate-700
  onDisabled: '#64748b',     // slate-500
  
  // Semantic states
  error: '#ef4444',          // red-500 (brighter for dark)
  onError: '#ffffff',        // white
  success: '#22c55e',        // green-500 (brighter for dark)
  onSuccess: '#ffffff',      // white
  warning: '#eab308',        // yellow-500 (brighter for dark)
  onWarning: '#111827'       // gray-900
};