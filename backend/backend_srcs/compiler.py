"""
This module provides functions to compile Python code to other languages using Pyccel.

Functions:

* `read_files_to_json`: Reads all files in a directory and returns them as JSON.
* `Compiler`: A class that encapsulates the functionality of compiling Python code to other languages using Pyccel.
* `Backend_compiler`: A function that compiles Python code to another language using Pyccel and returns the results.
* `Pyccel_version`: A function that returns the version of Pyccel.
"""
import os
import glob
import json
import re


def read_files_to_json(directory, file_types):
  """
  Reads all files in a directory and returns them as JSON.

  Args:
    directory: The directory to read the files from.
    file_types: A list of file extensions to read.

  Returns:
    A JSON object containing the files and their names.
  """

  all_files = glob.glob(f"{directory}/**/*")
  all_files += glob.glob(f"{directory}/*")
  #print(all_files)
  files = [i for i in all_files if i.endswith('.h') or i.endswith('.c') or i.endswith('.f90')]
  data = []
  for file in files:
    with open(file) as fp:
      filename_s =  re.sub("^.*?/__pyccel__/", "", file)
      data.append({"FileName": filename_s, "Content": fp.read()})

  return data
class Compiler():
    """
    A class that encapsulates the functionality of compiling Python code to other languages using Pyccel.

    Attributes:
      folder_name: The name of the temporary folder where the Python code is compiled.
      file_path: The path to the Python file that is being compiled.

    Methods:
      Load_Python: Loads a Python file from input.
      Compile_it: Compiles the Python file to another language using Pyccel.
      Cleanup: Cleans up the temporary folder.
    """
    def __init__(self):
        self.folder_name = f"Pyccel_{str(hash(self))}"

    def Load_Python(self, input :str):
        """
        Loads a Python file from input.

        Args:
          input: The Python code
        """
        self.folder_path = f"/tmp/{self.folder_name}"
        self.file_path = f"{self.folder_path}/code_python.py"

        os.mkdir(self.folder_path)
        with open(self.file_path,'w') as my_file:
            my_file.write(input)

    def Compile_it(self, language :str):
        """
        Translate the Python file to another language using Pyccel.

        Args:
        language: The language to compile the code to.

        Returns:
        A JSON object containing the Translated files.
        """
        file_types = ["c", "h", "f90", "py"]
        command_builder = f"pyccel {self.file_path} --language {language}"
        print(command_builder)
        os.system(command_builder)
        self.sources_dir = f"{self.folder_path}/__pyccel__"
        response = read_files_to_json(self.sources_dir, file_types)
        return response

    def Cleanup(self):
        """
            Cleanup the The /tmp/Pyccel folder used in compilation.
        """
        if os.path.exists(self.folder_path):
            os.system("rm -r {}".format(self.folder_path))

def Backend_compiler(input: str, language: str):
    """
    Compiles Python code to another language using Pyccel and returns the results.

    Args:
      input: The Python code
      language: The language to compile the code to.

    Returns:
      A JSON object containing the compiled code.
    """
    response = ""
    d = Compiler()
    d.Load_Python(input)
    response = d.Compile_it(language)
    d.Cleanup()
    return response

def Pyccel_version():
    """
    Returns the version of Pyccel.

    Returns:
      A dictionary containing the Pyccel version.
    """
    command_builder = f"pyccel --version > /tmp/release_pyccel.txt"
    os.system(command_builder)
    with open("/tmp/release_pyccel.txt",'r') as release:
      version = release.read()
    version = version.split(" ")
    if len(version) >= 2:
      return {version[0]: version[1]}
    return(None)



