FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4001

# EXPOSE $PORT
WORKDIR /var/www/app
COPY ./comments/package.json /var/www/app
RUN npm install
COPY ./config/config.json /var/www/app
COPY ./comments /var/www/app

# CMD ["npm", "start"]
CMD ["npm", "run", "production"]

# REFERENCE
# docker build -t flecheria/microservice-comment:0.0.1 -f comment.dockerfile .
# docker run flecheria/microservice-comment:0.0.1
