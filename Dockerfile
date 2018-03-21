FROM node:alpine as build

WORKDIR /app

COPY package.json .
COPY package.json /tmp/package.json
RUN cd /tmp && npm install
RUN cp -a /tmp/node_modules /app

COPY config config
COPY public public
COPY scripts scripts
COPY src src
COPY .babelrc .babelrc
COPY .env .env

RUN npm run build


FROM node:alpine

RUN npm install -g serve

COPY --from=build /app/build /build

EXPOSE 5000

CMD serve build
