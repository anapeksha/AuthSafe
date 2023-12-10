FROM node:lts-alpine

WORKDIR /usr/authsafe/app

COPY package*.json yarn.lock ./
COPY prisma/ ./
COPY gulpfile.js ./

RUN yarn install && yarn build

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]