FROM node:alpine as build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build


FROM node:alpine

ARG backend
ENV REACT_APP_BACKEND_URL=$backend

COPY --from=build /app/build /build

RUN npm install -g serve

EXPOSE 5000

CMD serve build
