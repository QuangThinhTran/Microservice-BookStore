# Stage 1: Build the NestJS application
FROM node:20.16.0-alpine as build

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and yarn-lock.json
COPY package*.json yarn.lock ./

# Copy the rest of your application
COPY . .

# Build the application
RUN yarn build

# Expose the port your application runs on
EXPOSE 3000

# Define the command to run your application
CMD ["yarn", "start:prod"]

# Define the command to run your application
#RUN ["chmod", "+x", "docker/entrypoint.sh"]