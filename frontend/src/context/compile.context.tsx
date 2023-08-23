import { Output } from "@/types/global";
import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useMemo,
    useState,
  } from "react";
import axios from "axios";

  interface ICompileContext {
    isFilled: boolean;
    setIsFilled: Dispatch<SetStateAction<boolean>>;
    input: string;
    setInput: Dispatch<SetStateAction<string>>;
    output: Output[];
    setOutput: Dispatch<SetStateAction<Output[]>>;
    selectedOutput: Output;
    setSelectedOutput: Dispatch<SetStateAction<Output>>;
    inLang: string;
    setInLang: Dispatch<SetStateAction<string>>;
    outLang: string;
    setOutLang: Dispatch<SetStateAction<string>>;
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }
  
  export const CompileContext = createContext<ICompileContext | undefined>(undefined);

  const loadMetadata = async () => {
    try {
      const instance = axios.create({
        baseURL: "http://localhost:8000",
      });
      instance
        .get("/metadata")
        .then((res) => {
          console.log(res.data);
          return res.data;
        }
        );
    } catch (error) {
      console.error(error);
    }
  };

  const CompileContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<Output[]>([]);
    const [inLang, setInLang] = useState("python");
    const [outLang, setOutLang] = useState("python");
    const [isFilled, setIsFilled] = useState(false);
    const [selectedOutput, setSelectedOutput] = useState<Output>({
      PageTitle: "",
      PageContent: "",
    });
    const [isLoading, setIsLoading] = useState(false);


    const value = useMemo(
      () => ({
        isFilled,
        setIsFilled,
        input,
        setInput,
        output,
        setOutput,
        inLang,
        setInLang,
        outLang,
        setOutLang,
        selectedOutput,
        setSelectedOutput,
        isLoading,
        setIsLoading,
      }),
      [isFilled, input, output, inLang, outLang, selectedOutput, isLoading]
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