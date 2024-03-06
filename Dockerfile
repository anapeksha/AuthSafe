FROM node:lts-alpine

WORKDIR /usr/authsafe/app

COPY package*.json yarn.lock gulpfile.js ./
COPY prisma/ ./

RUN yarn install && yarn build

COPY dist/ ./

COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]