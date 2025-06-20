FROM node:22-alpine3.22 AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

# Set the environment variable for the build
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

# Build the application
RUN npm run build

FROM nginx:1.28-alpine3.21-slim AS production

LABEL org.opencontainers.image.source=https://github.com/Q300Z/CESIZen_VUE

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
#COPY nginx.conf /etc/nginx/http.d/default.conf

# Start Nginx server
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
