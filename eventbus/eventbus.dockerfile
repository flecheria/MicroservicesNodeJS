FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4005

# EXPOSE $PORT
WORKDIR /www/var/eventbus
COPY package.json /www/var/eventbus
RUN npm install
COPY ./ /www/var/eventbus

CMD ["npm", "start"]
# CMD ["npm", "run", "startdocker"]
