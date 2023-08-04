FROM node:18-alpine

WORKDIR /server

COPY package*.json ./

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 4000

CMD ["npm", "run", "start:dev"]