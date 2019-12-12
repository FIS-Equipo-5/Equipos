FROM node:9-alpine

WORKDIR /app
COPY package.json .
COPY package-lock.json .

RUN npm install

COPY index.js /home/balta/Documentos/Máster/Asignaturas/FIS/Proyecto/teams/teamsAPI/v1/
COPY index.js .

EXPOSE 3000

CMD npm start