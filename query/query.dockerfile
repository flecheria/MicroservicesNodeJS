FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4002

# EXPOSE $PORT
WORKDIR /www/var/query
COPY package.json /www/var/query
RUN npm install
COPY ./ /www/var/query

CMD ["npm", "start"]
# CMD ["npm", "run", "startdocker"]
