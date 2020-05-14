import React from 'react';

interface NavigationRailContext {
  showLabels: boolean;
  selectedValue?: string;
  onChange?: (e: React.FormEvent<HTMLDivElement>, value: string) => void;
  color?: string;
}

const MyContext = React.createContext<NavigationRailContext>({
  showLabels: true,
});

export default MyContext;
