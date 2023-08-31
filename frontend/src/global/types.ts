export interface Output {
  PageTitle: string;
  PageContent: string;
}

export interface ExecOutput {
  pyccelOutput: string;
  pyccelErrors: string;
  pythonOutput: string;
  pythonErrors: string;
  securityOutput: string;
}

export interface IMetadata {
appName: string;
appVersion: string;
}