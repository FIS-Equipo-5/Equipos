FROM node:9-alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY docs ./docs
COPY teamsAPI ./teamsAPI
COPY playersAPI ./playersAPI
COPY server.js .
COPY db.js .
COPY index.js .

EXPOSE 3000

CMD npm start