FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4005

# EXPOSE $PORT
WORKDIR /var/www/app
COPY ./eventbus/package.json /var/www/app
RUN npm install
COPY ./config/config.json /var/www/app
COPY ./eventbus /var/www/app

CMD ["npm", "run", "production"]

# REFERENCE
# docker build -t flecheria/microservice-eventbus:0.0.1 -f eventbus.dockerfile .
# docker run flecheria/microservice-eventbus:0.0.1