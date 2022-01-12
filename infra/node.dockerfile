FROM node:14.15.5-alpine3.10

LABEL Maintainer = "Paolo Cappelletto"
LABEL Description = "Test project for NodeJS with MongoDB"

ENV NODE_ENV=development
ENV PORT=3000

WORKDIR /var/www/app
VOLUME . /var/www/app
EXPOSE $PORT

RUN npx browserslist@latest --update-db \
    && npm install

# ENTRYPOINT ["npm", "start"]
CMD [ "npm", "start" ]

##################################################
# INTERACTIVE DEVELOPMENT
##################################################

# Start MongoDB
# docker run --rm -d -v $(pwd)/data:/data/db -w /data/db --name mongo-test mongo:4.4.3-bionic
# MongoDB permission
# sudo chmod 0755 /data/db && sudo chown $USER /data/db
# Start Node and link to MongoDB
# docker run --rm -it -p 8080:3000 -v $(pwd):/var/www/app -w /var/www/app --link mongo-test:mongodb --name node-mongo-test node:14.15.4-alpine3.11

# Create bridge network
# docker network create --driver bridge nm-network
# Run MongoDB in network
# docker run --rm -d -p 27017:27017 -v $(pwd)/data:/data/db -w /data/db --net=nm-network --name mongo-test mongo:4.4.3-bionic
# Start Node in network
# docker run --rm -it -p 8080:3000 -v $(pwd):/var/www/app -w /var/www/app --net=nm-network --name node-mongo-test node:14.15.4-alpine3.11 /bin/sh

# docker exec -it <container-id> /bin/sh

##################################################
# REFERENCE
##################################################

# https://success.mirantis.com/article/how-can-i-access-mongodb-container-from-another-container