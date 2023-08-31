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
    isMobile: boolean;
    setIsMobile: Dispatch<SetStateAction<boolean>>;
    showTerminal: boolean;
    setShowTerminal: Dispatch<SetStateAction<boolean>>;
    terminalExtended: boolean;
    setTerminalExtended: Dispatch<SetStateAction<boolean>>;
    terminalRevExtended: boolean;
    setTerminalRevExtended: Dispatch<SetStateAction<boolean>>;
  }
  
  export const UIContext = createContext<IUIContext | undefined>(undefined);

  const UIContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [revIsExtended, setRevIsExtended] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
    const [isExtended, setIsExtended] = useState(false);
    const [showTerminal, setShowTerminal] = useState(false);
    const [terminalExtended, setTerminalExtended] = useState(false);
    const [terminalRevExtended, setTerminalRevExtended] = useState(false);
  
    const value = useMemo(
      () => ({
        isExtended,
        setIsExtended,
        revIsExtended,
        setRevIsExtended,
        terminalExtended,
        setTerminalExtended,
        terminalRevExtended,
        setTerminalRevExtended,
        isMobile,
        setIsMobile,
        showTerminal,
        setShowTerminal,
      }),
      [isExtended, revIsExtended, isMobile, showTerminal, terminalExtended, terminalRevExtended]
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