FROM node:18.13.0

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run db:generate
RUN yarn run test
RUN yarn run build

RUN rm -r /app/src/

CMD ["yarn", "run", "start"]
