"""
This Module will execute pyccel on a code choosing the language and return both
the file tranlated and the execution both python and the chosen language
"""
import os
import glob
import json


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
  print(all_files)
  files = [i for i in all_files if i.endswith('.h') or i.endswith('.c') or i.endswith('.f90')]
  data = []
  for file in files:
    with open(file) as fp:
      data.append({"FileName": file, "Content": fp.read()})

  #return json.dumps(data)
  return data
class Compiler():
    def __init__(self):
        self.folder_name = f"Pyccel_{str(hash(self))}"

    def Load_Python(self, input :str):
        """
            This Function Load Python file from input
            1 Create a folder using folder_name as name of folder
            2 Create a File in that folder with input that been loaded
        """
        self.folder_path = f"/tmp/{self.folder_name}"
        self.file_path = f"{self.folder_path}/code_python.py"

        os.mkdir(self.folder_path)
        with open(self.file_path,'w') as my_file:
            my_file.write(input)

    def Compile_it(self, language :str):
        file_types = ["c", "h", "f90", "py"]
        command_builder = f"pyccel {self.file_path} --language {language}"
        print(command_builder)
        os.system(command_builder)
        self.sources_dir = f"{self.folder_path}/__pyccel__"
        response = read_files_to_json(self.sources_dir, file_types)
        return response

    def Cleanup(self):
        """
            Cleanup the Folders - and ever"code.py"ything.
        """
        if os.path.exists(self.folder_path):
            os.system("rm -r {}".format(self.folder_path))

# if __name__ == '__main__':
#     d = Compiler()
#     d.Load_Python("print('Bifenzi')\n")
#     d.Compile_it('c')
#     d.Cleanup()
#     print(d.folder_name)

def Backend_compiler(input: str, language: str):
    response = ""
    d = Compiler()
    d.Load_Python(input)
    response = d.Compile_it(language)
    d.Cleanup()
    return response

def Pyccel_version():
    command_builder = f"pyccel --version > /tmp/release_pyccel.txt"
    os.system(command_builder)
    with open("/tmp/release_pyccel.txt",'r') as release:
      version = release.read()
    version = version.split(" ")
    if len(version) >= 2:
      return {version[0]: version[1]}
    return(None)



