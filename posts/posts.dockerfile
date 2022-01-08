FROM node:16-alpine3.14

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for Microservice with NodeJS"

# ENV NODE_ENV=development
ENV PORT=4000

# EXPOSE $PORT
WORKDIR /www/var/posts
COPY package.json /www/var/posts
RUN npm install
COPY ./ /www/var/posts

CMD ["npm", "start"]
# CMD ["npm", "run", "startdocker"]

# REFERENCE
#  docker build -t flecheria/microservice-posts:0.0.1 -f posts.dockerfile .
