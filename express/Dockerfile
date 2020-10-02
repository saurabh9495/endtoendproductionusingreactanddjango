FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -la

ENTRYPOINT ["npm", "start"]