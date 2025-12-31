import React, { createContext, useContext } from 'react';

interface LayoutContextType {
  isLeftSidebarCollapsed: boolean;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

interface LayoutProviderProps {
  children: React.ReactNode;
  isLeftSidebarCollapsed: boolean;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({
  children,
  isLeftSidebarCollapsed,
}) => {
  return (
    <LayoutContext.Provider value={{ isLeftSidebarCollapsed }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
