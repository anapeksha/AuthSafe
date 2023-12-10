FROM node:lts-alpine

WORKDIR /usr/authsafe/app

COPY package*.json yarn.lock ./
COPY prisma/ ./
COPY gulpfile.js ./

RUN yarn install
RUN yarn build

COPY dist/ ./

RUN rm -rf node_modules

ENV NODE_ENV=production
RUN yarn install && yarn cache clean

EXPOSE 8080

CMD [ "yarn", "start" ]