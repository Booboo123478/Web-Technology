# Step 1: Use Node image to build the React app
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build React app (outputs to /app/build)
RUN npm run build
