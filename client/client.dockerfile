FROM node:16-alpine3.14

# Add the following line forhttps://github.com/facebook/create-react-app/issues/8688
ENV CI=true

WORKDIR /var/www/app
COPY package.json /var/www/app
COPY package-lock.json /var/www/app
RUN npm install
COPY ./ /var/www/app

CMD ["npm", "start"]
# CMD ["npm", "run", "production"]

# REFERENCE
# docker build -t flecheria/microservice-client:0.0.1 -f client.dockerfile .
# docker run flecheria/microservice-client:0.0.1
