import React from 'react';

interface NavigationRailContext {
  showLabels: boolean;
  selectedValue?: string;
  onChange?: (e: React.FormEvent<HTMLDivElement>, value: string) => void;
}

const NavigationRailContext = React.createContext<NavigationRailContext>({
  showLabels: true,
});

export default NavigationRailContext;
