FROM ubuntu:latest

#update and install python and fastAPI
RUN apt-get update -y && \
   apt install python3 -y &&\
   apt install python3-pip -y && \
   pip install "fastapi[all]" && \
   pip install "uvicorn[standard]"


# neccessary pacakges to run pyccel
RUN apt-get update \
	&& apt-get install -y gcc && apt-get install -y gfortran \
	&& apt-get install -y libblas-dev liblapack-dev\
	&& apt-get install -y libopenmpi-dev openmpi-bin\
	&& apt-get install -y libomp-dev libomp5

# neccessary pacakges to run pyccel
RUN apt-get -y install build-essential zlib1g-dev libncurses5-dev libgdbm-dev \
	libnss3-dev libssl-dev libreadline-dev libffi-dev wget git
RUN pip install pyccel


WORKDIR /home/

COPY ./backend_srcs/* /home/backend_srcs/


WORKDIR /home/backend_srcs/

EXPOSE 8000


CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8000"]