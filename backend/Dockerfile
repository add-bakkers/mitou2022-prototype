FROM python:3.8-slim-bullseye

ENV APP_PATH /opt/apps
ENV HOME /root
ENV PATH ${PATH}:${HOME}/.poetry/bin
ENV DEBIAN_FRONTEND noninteractive

COPY . ${APP_PATH}
WORKDIR ${APP_PATH}

RUN apt update && apt upgrade -y && apt install -y curl
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -

RUN poetry install --no-dev

ENTRYPOINT [ "poetry", "run" ]
CMD ["python", "backend/manage.py", "runserver"]
