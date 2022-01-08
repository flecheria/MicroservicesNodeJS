FROM node:14-alpine3.14

WORKDIR /www/var/posts
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]
