FROM node:16-alpine3.14

WORKDIR /www/var/client
COPY package.json /www/var/client
RUN npm install
COPY ./ /www/var/client

CMD ["npm", "start"]
