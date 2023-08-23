from fastapi import FastAPI, Form
from fastapi.exceptions import HTTPException

import compiler
app = FastAPI()
import json

@app.get("/")
async def root():
    return {"message": "Hello World"}

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
        raise HTTPException(
            status_code=400,
            detail="The Code Couldnt be Compiled",
        )
    return response