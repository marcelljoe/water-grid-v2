# Use base image (LTS) for production as builder
FROM node:18.18.0 AS builder

# Set the working directory for builder
WORKDIR /vol/app

# Copy only *.json to leverage docker caching
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy all file to workdir
COPY . .

# Build service
RUN yarn run build

# Use base image (bullseye-slim) for production
FROM node:18.18.0-bullseye-slim AS production

# Set the working directory inside the container for production
WORKDIR /vol/app

# Copy only the production dependencies and the compiled application from the builder stage
COPY --from=builder /vol/app/package*.json ./
COPY --from=builder /vol/app/.next ./.next
COPY --from=builder /vol/app/public ./public
COPY --from=builder /vol/app/public ./.env.production

# Set NODE ENV to production
ENV NODE_ENV production

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Expose Port Service
EXPOSE 9090

# Execute command running service
CMD [ "yarn", "start" ]
