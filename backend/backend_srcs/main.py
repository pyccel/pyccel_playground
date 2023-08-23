from fastapi import FastAPI, Form
from fastapi.exceptions import HTTPException
from fastapi.middleware.cors import CORSMiddleware

import compiler
app = FastAPI()
import json

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.get("/")
async def root():
    return {"message": "Hello World, check /docs please for how to use the API"}

@app.get("/pyccel-version")
async def pyccel_version():
    version = compiler.Pyccel_version()
    if not version:
        return {"PyccelBackend:": "Backend Couldn't get the version"}
    return version

@app.post("/submit-python")
async def submit_python(text: str, language: str):
    """Submit a code and return translation."""

    if not text:
        raise HTTPException(
            status_code=400,
            detail="Please provide some text.",
        )
    if language not in ["c", "fortran", "python"]:
        raise HTTPException(
            status_code=400,
            detail="Invalid language. Supported languages are: c, fortran, python.",
        )

    response = compiler.Backend_compiler(text, language)
    if not response:
        return {"PyccelBackend:": "Backend Couldn't Compile the code"}
    return response