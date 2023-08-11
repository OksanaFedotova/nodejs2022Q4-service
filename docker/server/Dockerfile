FROM node:18-alpine AS development

WORKDIR /server

COPY  package*.json ./

COPY . .

RUN npm install

EXPOSE 4000 

CMD ["npm", "run", "start:prisma"]