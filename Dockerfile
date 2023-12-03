FROM node:lts

WORKDIR /usr/authsafe/app

COPY package*.json ./
COPY prisma/ ./
COPY yarn.lock ./
COPY . .

RUN yarn install
RUN yarn build

EXPOSE 8080

CMD [ "yarn", "start" ]