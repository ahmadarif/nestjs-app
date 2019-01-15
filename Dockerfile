FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy all files
COPY . /usr/src/app/

# Install dependency
RUN npm install

# Build the app (transpile from TypeScript to JavaScript)
RUN npm run build

CMD ["npm", "run", "start:prod"]