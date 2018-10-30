# Development (nonproduction) Dockerfile
FROM node:8.9-alpine

# Create a work directory and copy over our dependency manifest files.
RUN mkdir /app
WORKDIR /app
COPY /src /app/src

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# RUN npm install --silent && mv node_modules ../
RUN yarn build

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3000