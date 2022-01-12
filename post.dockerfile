FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4000

# EXPOSE $PORT
WORKDIR /var/www/app
COPY ./posts/package.json /var/www/app
COPY ./posts/package-lock.json /var/www/app
RUN npm install
COPY ./config/config.json /var/www/app
COPY ./posts /var/www/app

CMD ["npm", "run", "production"]

# REFERENCE
# docker build -t flecheria/microservice-post:0.0.1 -f post.dockerfile .
# docker run flecheria/microservice-posts:0.0.1
