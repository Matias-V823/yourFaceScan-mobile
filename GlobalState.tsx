import React, { createContext, useContext, useState } from 'react';

// Define el tipo de dato para los escaneos
interface Scan {
  id: string;
  data: any; // Puedes ajustar el tipo según los datos que manejes
}

interface GlobalStateContextType {
  scans: Scan[];
  addScan: (scan: Scan) => void;
}

const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

export const GlobalStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scans, setScans] = useState<Scan[]>([]);

  const addScan = (scan: Scan) => {
    setScans((prevScans) => [...prevScans, scan]);
  };

  return (
    <GlobalStateContext.Provider value={{ scans, addScan }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
