FROM node:16-alpine

WORKDIR /app
COPY package*.json ./

COPY . .

EXPOSE 3000

RUN npm install

CMD ["npm", "run", "run:prod"]
