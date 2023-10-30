FROM node:18

WORKDIR /frontend

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD [ "yarn", "start" ]
EXPOSE 9000
