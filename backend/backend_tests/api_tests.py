

import requests
import asyncio
import pytest
from httpx import AsyncClient



def sendit(code :str):
    url = "http://localhost:8000/submit-python"

    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }

    data = {
        "text": code,
        "language": "c",
    }

    response = requests.post(url, headers=headers, json=data)

    print(response.status_code)
    return(response.content)

def executeit(code :str):
    url = "http://localhost:8000/execute-python"

    headers = {
        "accept": "application/json",
        "Content-Type": "application/json",
    }

    data = {
        "text": code,
        "language": "c",
    }

    response = requests.post(url, headers=headers, json=data)

    print(response.status_code)
    return(response.content)



# def mainc():
#     tests_files = ["./test_1.py","./test_2.py","./test_3.py"]
#     for i in range(100):
#         for i in tests_files:
#             with open(i,'r') as f:
#                 code = f.read()
#                 sendit(code)
#                 executeit(code)


# mainc()


with open("./test_1.py", 'r') as f:
    code_1 = f.read()

with open("./test_2.py", 'r') as f:
    code_2 = f.read()

with open("./test_3.py", 'r') as f:
    code_3 = f.read()




@pytest.mark.anyio
async def test_post_1():
    data = {
        "text": code_1,
        "language": "c",
    }
    print(code_2)
    async with AsyncClient() as session:
        response = await session.post("http://localhost:8000/execute-python", json=data, timeout = 30)
    assert response.status_code == 200
    #assert response.json() == {"key": "value"}
    print(response.json())


@pytest.mark.anyio
async def test_post_2():
    data = {
        "text": code_2,
        "language": "c",
    }
    print(code_2)
    async with AsyncClient() as session:
        response = await session.post("http://localhost:8000/execute-python", json=data, timeout = 30)
    assert response.status_code == 200
    #assert response.json() == {"key": "value"}
    print(response.json())


@pytest.mark.anyio
async def test_post_3():
    data = {
        "text": code_3,
        "language": "c",
    }
    print(code_2)
    async with AsyncClient() as session:
        response = await session.post("http://localhost:8000/execute-python", json=data, timeout = 30)
    assert response.status_code == 200
    #assert response.json() == {"key": "value"}
    print(response.json())





# @pytest.mark.anyio
# async def test_root():
#     async with AsyncClient(base_url="http://localhost:8000") as ac:
#         response = await ac.get("/")
#     assert response.status_code == 200
#     print(response.json())