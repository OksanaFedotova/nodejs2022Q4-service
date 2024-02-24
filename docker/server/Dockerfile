FROM node:18-alpine AS server
USER node
WORKDIR /server

COPY --chown=node:node package*.json ./

COPY --chown=node:node . .

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start:prisma"]
