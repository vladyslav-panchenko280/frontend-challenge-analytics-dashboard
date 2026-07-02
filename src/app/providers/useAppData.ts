import { useContext } from "react";
import { AppDataContext, type AppDataContextType } from "./AppDataContext";

export const useAppData = (): AppDataContextType => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return context;
};
