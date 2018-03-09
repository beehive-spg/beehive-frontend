FROM node:alpine

COPY package.json .

RUN npm install --production && npm install -g serve

ARG backend
ENV REACT_APP_BACKEND_URL=$backend

COPY build .

EXPOSE 5000

CMD serve .
