import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useMemo,
    useState,
  } from "react";

  interface ICompileContext {
    isFilled: boolean;
    setIsFilled: Dispatch<SetStateAction<boolean>>;
  }
  
  export const CompileContext = createContext<ICompileContext | undefined>(undefined);

  const CompileContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isFilled, setIsFilled] = useState(false);
  
    const value = useMemo(
      () => ({
        isFilled,
        setIsFilled,
      }),
      [isFilled,]
    );
  
    return <CompileContext.Provider value={value}>{children}</CompileContext.Provider>;
  };

  const useCompileContext = () => {
    const context = useContext(CompileContext);
    if (context === undefined) {
      throw new Error("useCompileContext must be used within a CompileContextProvider");
    }
    return context;
  };
  
  export { CompileContextProvider, useCompileContext };