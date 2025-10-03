import React, { ReactNode } from 'react';
import { cn } from "@/lib/utils";

interface ResponsiveLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ResponsiveLayout({ children, className }: ResponsiveLayoutProps) {
  return (
    <div className={cn(
      // Base responsive container
      "w-full min-h-screen",
      
      // Mobile-first padding and spacing
      "px-2 py-2 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-8 lg:py-8",
      
      // Max width constraints for very large screens
      "max-w-[100vw] mx-auto",
      
      // Ensure proper spacing on all devices
      "space-y-4 sm:space-y-6 lg:space-y-8",
      
      // Handle orientation changes
      "orientation-portrait:max-w-full",
      "orientation-landscape:max-w-full",
      
      className
    )}>
      <div className={cn(
        // Responsive grid system
        "grid grid-cols-1 gap-4",
        "sm:gap-6",
        "lg:gap-8",
        
        // Auto-fit layout for cards
        "auto-rows-min"
      )}>
        {children}
      </div>
    </div>
  );
}

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
}

export function ResponsiveGrid({ 
  children, 
  className, 
  cols = { mobile: 1, tablet: 2, desktop: 3 } 
}: ResponsiveGridProps) {
  return (
    <div className={cn(
      `grid gap-4 sm:gap-6 lg:gap-8`,
      `grid-cols-${cols.mobile}`,
      `sm:grid-cols-${cols.tablet}`,
      `lg:grid-cols-${cols.desktop}`,
      
      // Ensure cards don't overflow
      "w-full overflow-hidden",
      
      // Auto-fit for better responsive behavior
      "auto-rows-fr",
      
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveCardProps {
  children: ReactNode;
  className?: string;
  fullWidth?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export function ResponsiveCard({ 
  children, 
  className, 
  fullWidth = false,
  priority = 'medium' 
}: ResponsiveCardProps) {
  return (
    <div className={cn(
      // Base card styling
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      
      // Responsive sizing
      "w-full",
      fullWidth && "col-span-full",
      
      // Priority-based ordering (mobile-first)
      priority === 'high' && "order-1",
      priority === 'medium' && "order-2",
      priority === 'low' && "order-3",
      
      // Large screen priority reset
      "lg:order-none",
      
      // Ensure proper overflow handling
      "overflow-hidden",
      
      // Min height for consistent card sizes
      "min-h-[120px]",
      
      // Responsive padding
      "p-4 sm:p-6",
      
      className
    )}>
      {children}
    </div>
  );
}

interface MobileOptimizedHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function MobileOptimizedHeader({ 
  title, 
  subtitle, 
  actions, 
  className 
}: MobileOptimizedHeaderProps) {
  return (
    <div className={cn(
      // Responsive header layout
      "flex flex-col gap-4",
      "sm:flex-row sm:items-center sm:justify-between",
      
      // Mobile-first spacing
      "mb-6 sm:mb-8",
      
      // Ensure text doesn't overflow
      "w-full overflow-hidden",
      
      className
    )}>
      <div className="min-w-0 flex-1">
        <h1 className={cn(
          // Responsive typography
          "text-2xl font-bold tracking-tight",
          "sm:text-3xl",
          "lg:text-4xl",
          
          // Prevent text overflow
          "truncate"
        )}>
          {title}
        </h1>
        {subtitle && (
          <p className={cn(
            // Responsive subtitle
            "text-sm text-muted-foreground",
            "sm:text-base",
            
            // Multi-line handling
            "mt-1 sm:mt-2",
            "line-clamp-2 sm:line-clamp-1"
          )}>
            {subtitle}
          </p>
        )}
      </div>
      
      {actions && (
        <div className={cn(
          // Responsive action buttons
          "flex flex-col gap-2",
          "sm:flex-row sm:gap-3",
          
          // Ensure buttons don't shrink too much
          "shrink-0"
        )}>
          {actions}
        </div>
      )}
    </div>
  );
}

// Hook for responsive breakpoints
export function useResponsiveBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<'mobile' | 'tablet' | 'desktop'>('mobile');

  React.useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    window.addEventListener('orientationchange', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
      window.removeEventListener('orientationchange', updateBreakpoint);
    };
  }, []);

  return breakpoint;
}