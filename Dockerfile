FROM node:lts-alpine

WORKDIR /usr/authsafe/app

COPY package*.json yarn.lock gulpfile.js tsconfig.json ./
COPY prisma/ ./

RUN yarn install && yarn build

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]