FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4003

# EXPOSE $PORT
WORKDIR /www/var/moderation
COPY package.json /www/var/moderation
RUN npm install
COPY ./ /www/var/moderation

CMD ["npm", "start"]
# CMD ["npm", "run", "startdocker"]
