import React, { createContext, useContext } from "react";
import { AppConfig } from "./appConfigTypes";

const AppConfigContext = createContext<AppConfig | undefined>(undefined);

export const AppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const config: AppConfig = {
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY!,
  };
  return <AppConfigContext.Provider value={config}>{children}</AppConfigContext.Provider>;
};

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (!context) throw new Error("useAppConfig must be used within AppConfigProvider");
  return context;
};