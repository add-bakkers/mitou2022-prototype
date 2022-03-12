
FROM node

ENV APP_PATH /opt/apps/frontend
WORKDIR ${APP_PATH}
COPY package.json /opt/apps/frontend

RUN npm install
RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . ${APP_PATH}

EXPOSE 3000
CMD ["npm", "start"]
