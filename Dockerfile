FROM node:latest AS beehive-frontend

WORKDIR /usr/src/frontend

COPY . .

EXPOSE 3000

CMD npm install && npm start
