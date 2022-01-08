FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4001

# EXPOSE $PORT
WORKDIR /www/var/comments
COPY package.json /www/var/comments
RUN npm install
COPY ./ /www/var/comments

CMD ["npm", "start"]
