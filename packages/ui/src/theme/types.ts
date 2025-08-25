export type Theme = {
  // Brand colors - multiple button variants
  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  tertiary: string;
  onTertiary: string;
  
  // Surface hierarchy
  background: string;        // page background
  onBackground: string;      
  surface: string;           // cards, modals
  onSurface: string;
  
  // Interactive states
  border: string;            // input borders, dividers
  hover: string;             // hover overlay
  focus: string;             // focus rings
  disabled: string;          // disabled backgrounds
  onDisabled: string;
  
  // Semantic states
  error: string;
  onError: string;
  success: string;
  onSuccess: string;
  warning: string;
  onWarning: string;
};