import React from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ 
  children, 
  className = '' 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const responsiveClass = `
    responsive-container 
    ${isMobile ? 'mobile-layout' : ''} 
    ${isTablet ? 'tablet-layout' : ''} 
    ${isDesktop ? 'desktop-layout' : ''} 
    ${className}
  `.trim();

  return (
    <div className={responsiveClass} data-mobile={isMobile}>
      {children}
    </div>
  );
};

// Hook for responsive utilities
export const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallScreen,
    // Responsive values
    spacing: isMobile ? 1 : isTablet ? 2 : 3,
    cardPadding: isMobile ? 2 : 3,
    containerMaxWidth: isMobile ? 'sm' : isTablet ? 'md' : 'lg',
  };
};

export default ResponsiveLayout;
