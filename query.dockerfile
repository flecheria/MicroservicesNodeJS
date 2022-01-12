FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4002

# EXPOSE $PORT
WORKDIR /var/www/app
COPY ./query/package.json /var/www/app
RUN npm install
COPY ./config/config.json /var/www/app
COPY ./query /var/www/app

# CMD ["npm", "start"]
CMD ["npm", "run", "production"]

# REFERENCE
# docker build -t flecheria/microservice-query:0.0.1 -f query.dockerfile .
# docker run flecheria/microservice-query:0.0.1
