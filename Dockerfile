FROM node:lts-alpine

WORKDIR /usr/authsafe/app

COPY package*.json yarn.lock ./
COPY prisma/ ./
COPY gulpfile.js ./

RUN yarn install && yarn build

COPY . .

RUN rm -rf node_modules src

RUN yarn install --production --frozen-lockfile && yarn cache clean

EXPOSE 8080

CMD [ "yarn", "start" ]