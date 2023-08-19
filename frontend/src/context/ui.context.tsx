import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useMemo,
    useState,
  } from "react";

  interface IUIContext {
    isExtended: boolean;
    setIsExtended: Dispatch<SetStateAction<boolean>>;
  }
  
  export const UIContext = createContext<IUIContext | undefined>(undefined);

  const UIContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isExtended, setIsExtended] = useState(false);
  
    const value = useMemo(
      () => ({
        isExtended,
        setIsExtended,
      }),
      [isExtended,]
    );
  
    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
  };

  const useUIContext = () => {
    const context = useContext(UIContext);
    if (context === undefined) {
      throw new Error("useUIContext must be used within a UIContextProvider");
    }
    return context;
  };
  
  export { UIContextProvider, useUIContext };