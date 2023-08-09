FROM node:18-alpine AS development

WORKDIR /server

COPY package*.json ./

COPY . /server

RUN npm install --legacy-peer-deps && npm cache clean --force

EXPOSE 4000 

CMD ["npm", "run", "start:dev"]