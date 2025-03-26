/**
 * Theme Colors for CapyDB Documentation
 * 
 * This file documents the official theme colors used throughout the CapyDB documentation.
 * When creating new components or updating existing ones, please refer to these color values
 * for consistency across the documentation.
 */

/**
 * Primary Theme Colors
 * 
 * - text-blue-600: color: rgb(37 99 235 / var(--tw-text-opacity, 1));
 *   Used for links and primary UI elements in light mode
 * 
 * - text-blue-400: color: rgb(96 165 250 / var(--tw-text-opacity, 1));
 *   Used for links and primary UI elements in dark mode
 * 
 * - hover:text-blue-700: color: rgb(29 78 216 / var(--tw-text-opacity, 1));
 *   Used for hover states on links in light mode
 * 
 * - hover:text-blue-300: color: rgb(147 197 253 / var(--tw-text-opacity, 1));
 *   Used for hover states on links in dark mode
 * 
 * - bg-blue-50/80: background-color with 80% opacity of light blue
 *   Used for note backgrounds in light mode
 * 
 * - bg-blue-950/30: background-color with 30% opacity of dark blue
 *   Used for note backgrounds in dark mode
 */

/**
 * Note Box Colors
 * 
 * For note boxes, we use a combination of:
 * - bg-blue-50/80 dark:bg-blue-950/30: Background color
 * - text-gray-800 dark:text-gray-200: Text color
 * - border border-blue-100 dark:border-blue-900: Border color
 */

/**
 * Usage Examples:
 * 
 * - Links: className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
 * - Note boxes: className="bg-blue-50/80 dark:bg-blue-950/30 p-4 rounded-md text-gray-800 dark:text-gray-200 border border-blue-100 dark:border-blue-900"
 * - Focus rings: className="focus:ring-gray-500"
 */

export const themeColors = {
  // Primary theme colors
  primary: {
    light: 'text-amber-600', // For light mode text
    dark: 'text-amber-400',  // For dark mode text
    bg: {
      light: 'bg-amber-500/10', // Semi-transparent background for light mode
      dark: 'bg-amber-500/10',  // Semi-transparent background for dark mode
    },
    border: {
      light: 'border-amber-500/20', // Semi-transparent border for light mode
      dark: 'border-amber-500/20',  // Semi-transparent border for dark mode
    },
    hover: {
      light: 'hover:text-amber-500', // Hover state for light mode
      dark: 'hover:text-amber-300',  // Hover state for dark mode
    },
    active: {
      light: 'bg-amber-50 text-amber-700', // Active state for light mode
      dark: 'bg-amber-900/20 text-amber-300', // Active state for dark mode
    },
  },
  
  // Text colors
  text: {
    primary: {
      light: 'text-gray-900',
      dark: 'text-white',
    },
    secondary: {
      light: 'text-gray-700',
      dark: 'text-gray-300',
    },
    tertiary: {
      light: 'text-gray-600',
      dark: 'text-gray-400',
    },
  },
  
  // Background colors
  background: {
    primary: {
      light: 'bg-white',
      dark: 'bg-gray-900',
    },
    secondary: {
      light: 'bg-gray-50',
      dark: 'bg-gray-800',
    },
    tertiary: {
      light: 'bg-gray-100',
      dark: 'bg-gray-700',
    },
  },
  
  // Border colors
  border: {
    light: 'border-gray-200',
    dark: 'border-gray-700',
  },
};

/**
 * Usage examples:
 * 
 * For text:
 * className={`${themeColors.primary.light} dark:${themeColors.primary.dark}`}
 * 
 * For backgrounds:
 * className={`${themeColors.primary.bg.light} dark:${themeColors.primary.bg.dark}`}
 * 
 * For borders:
 * className={`border ${themeColors.primary.border.light} dark:${themeColors.primary.border.dark}`}
 * 
 * For active states:
 * className={`${isActive ? themeColors.primary.active.light : ''} dark:${isActive ? themeColors.primary.active.dark : ''}`}
 */

export default themeColors; 