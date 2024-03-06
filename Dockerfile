FROM node:lts-alpine

WORKDIR /usr/authsafe/app

COPY package*.json ./

COPY . .

RUN npm install && npm run build

RUN rm -rf src/

EXPOSE 8080

CMD [ "npm", "start" ]