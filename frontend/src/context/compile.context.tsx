import { ExecOutput, Output } from "@/global/types";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { useUIContext } from "./ui.context";
// import { IMetadata } from "@/global/types";

interface ICompileContext {
  metadata: string;
  setMetadata: Dispatch<SetStateAction<string>>;
  isFilled: boolean;
  setIsFilled: Dispatch<SetStateAction<boolean>>;
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  output: Output[];
  setOutput: Dispatch<SetStateAction<Output[]>>;
  selectedOutput: Output;
  setSelectedOutput: Dispatch<SetStateAction<Output>>;
  defaultPage: string;
  setDefaultPage: Dispatch<SetStateAction<string>>;
  outLang: string;
  setOutLang: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  execOutput: ExecOutput;
  setExecOutput: Dispatch<SetStateAction<ExecOutput>>;
  handleSubmit: () => Promise<void>;
  handleExecute: () => Promise<void>;
  handleSelectChange?: (selectedValue: string) => void;
}

const initialContext: ICompileContext = {
  metadata: "",
  setMetadata: () => { },
  isFilled: false,
  setIsFilled: () => { },
  input: "",
  setInput: () => { },
  output: [],
  setOutput: () => { },
  selectedOutput: {
    PageTitle: "",
    PageContent: "",
  },
  setSelectedOutput: () => { },
  defaultPage: "",
  setDefaultPage: () => { },
  outLang: "",
  setOutLang: () => { },
  isLoading: false,
  setIsLoading: () => { },
  execOutput: {
    pyccelOutput: "",
    pyccelErrors: "",
    pythonOutput: "",
    pythonErrors: "",
    securityOutput: "",
  },
  setExecOutput: () => { },
  handleSubmit: () => { return Promise.resolve() },
  handleExecute: () => { return Promise.resolve() },
  handleSelectChange: () => { },
};

export const CompileContext = createContext<ICompileContext>(initialContext);

const loadMetadata = async () => {
  try {
    const instance = axios.create({
      baseURL: "http://localhost:8000/"
    });
    const response = await instance
      .get("/pyccel-version")
    console.log(response.data.pyccel)
    return response.data.pyccel

  } catch (error) {
    console.error(error);
  }
};


const CompileContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [metadata, setMetadata] = useState<string>(initialContext.metadata);
  const [input, setInput] = useState(initialContext.input);
  const [output, setOutput] = useState<Output[]>(initialContext.output);
  const [defaultPage, setDefaultPage] = useState<string>(initialContext.defaultPage);
  const [outLang, setOutLang] = useState(initialContext.outLang);
  const [isFilled, setIsFilled] = useState(initialContext.isFilled);
  const [selectedOutput, setSelectedOutput] = useState<Output>(initialContext.selectedOutput);
  const [execOutput, setExecOutput] = useState<ExecOutput>(initialContext.execOutput);
  const [isLoading, setIsLoading] = useState(initialContext.isLoading);
  const { BASE_URL, VERSION, TRANSLATE, EXECUTE } = process.env;
  const uiCtx = useUIContext();

  const handleSelectChange = useCallback((selectedValue: string) => {
    console.log("selected value", selectedValue);
    const selected = output.find((item) => item.PageTitle === selectedValue);
    if (selected) {
      setSelectedOutput(selected);
      console.log("selected output", selected);
      // setDefaultPage("");
    }
  }, [output, setSelectedOutput]);

  const handleSubmit = useCallback(async () => {
    console.log("submitting");

    if (outLang && input) {
      setIsLoading(true);
      try {
        const requestData = {
          text: input,
          language: outLang,
        };
        const instance = axios.create({
          baseURL: "http://localhost:8000/"
        });
        const response = await instance.post("/submit-python", requestData);
        console.log("this is submit resp", response.data);
        // console.log("default page", defaultPage);
        if (response.data.files.length === 0) {
          alert(response.data.Error);
        }
        const outputArray = response.data.files.map((item: any) => {
          return {
            PageTitle: item.FileName,
            PageContent: item.Content,
          };
        }
        );
        const selectedOutput = response.data.Default[0];
        setSelectedOutput({ PageTitle: selectedOutput.FileNameDefault, PageContent: selectedOutput.ContentDefault });
        console.log("this is the selected output", selectedOutput);
        const defaultPage = response.data.Default[0].FileNameDefault;
        setDefaultPage(defaultPage);
        console.log("this is the default page = = = ==   >", defaultPage);
        // console.log("this is the default page = = = ==   >", response.data.Default[0].ContentDefault);
        setOutput(outputArray);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    else {
      alert("Please fill all the fields");
    }
  }, [outLang, input, setDefaultPage, setSelectedOutput, setOutput, setIsLoading]);

  const handleExecute = useCallback(async () => {
    console.log("running");
    if (outLang && input) {
      uiCtx.setShowTerminal(true);
      setIsLoading(true);
      try {
        const requestData = {
          text: input,
          language: outLang,
        };
        const instance = axios.create({
          baseURL: BASE_URL,
        });
        const response = await instance.post("/execute-python", requestData);
        console.log("this is execute resp", response.data);

        const exec = {
          pyccelOutput: response.data.Pyccel.execution_output,
          pyccelErrors: response.data.Pyccel.error_output,
          pythonOutput: response.data.Python.execution_output,
          pythonErrors: response.data.Python.error_output,
          securityOutput: response.data.Security.Security_report,
        };
        setExecOutput(exec);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    else {
      alert("Please fill all the fields");
    }
  }, [outLang, input, uiCtx, BASE_URL]);

  const value = useMemo(
    () => ({
      metadata,
      setMetadata,
      isFilled,
      setIsFilled,
      input,
      setInput,
      output,
      setOutput,
      defaultPage,
      setDefaultPage,
      outLang,
      setOutLang,
      selectedOutput,
      setSelectedOutput,
      isLoading,
      setIsLoading,
      execOutput,
      setExecOutput,
      handleSubmit,
      handleExecute,
      handleSelectChange,

    }),
    [isFilled, input, output, defaultPage, outLang, selectedOutput, isLoading, metadata, execOutput, handleSubmit, handleExecute, handleSelectChange, setDefaultPage]
  );

  useEffect(() => {
    if (!metadata) {
      console.log("debug", metadata)

      loadMetadata()
        .then((data) => {
          setMetadata(data);
        })
        .catch((error) => {
          setMetadata("1.0.0")
        })

    }
  }, []);

  // update 

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