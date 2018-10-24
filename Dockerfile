# Development (nonproduction) Dockerfile
FROM node:8.9-alpine

# Create a work directory and copy over our dependency manifest files.
RUN mkdir /app
WORKDIR /app
COPY /src /app/src
COPY ["package.json", "package-lock.json*", "yarn.lock", "./"]

# RUN npm install --silent && mv node_modules ../
RUN yarn build

# Expose PORT 3000 on our virtual machine so we can run our server
EXPOSE 3000