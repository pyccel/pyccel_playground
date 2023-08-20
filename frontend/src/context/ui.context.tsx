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
    revIsExtended: boolean;
    setRevIsExtended: Dispatch<SetStateAction<boolean>>;
  }
  
  export const UIContext = createContext<IUIContext | undefined>(undefined);

  const UIContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isExtended, setIsExtended] = useState(false);
    const [revIsExtended, setRevIsExtended] = useState(false);
  
    const value = useMemo(
      () => ({
        isExtended,
        setIsExtended,
        revIsExtended,
        setRevIsExtended,
      }),
      [isExtended, revIsExtended]
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