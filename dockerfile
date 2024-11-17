FROM docker.io/library/node:18.16.0

WORKDIR /quiz/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7700

ENV NODE_ENV=production

CMD ["npm", "run", "start"]
