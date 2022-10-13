FROM node:16.17.0-bullseye-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -force
COPY . ./
EXPOSE 8080
CMD [ "node", "server" ]
