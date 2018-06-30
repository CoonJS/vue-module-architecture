FROM node:9

WORKDIR /Users/br/Projects/salestat

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]