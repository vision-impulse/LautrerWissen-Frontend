# Use an official Node.js image as a base
FROM node:18-alpine AS builder

# Install PNPM globally
RUN npm i -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install 

#RUN apk --no-cache add curl

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN pnpm build

# ---- Production image ----
# Use a minimal runtime image for production
FROM node:18-alpine as runner

# Install PNPM globally
RUN npm i -g pnpm

# Set the working directory
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app ./
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next

# Expose the Next.js port
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]