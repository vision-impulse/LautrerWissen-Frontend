# Use an official Node.js image as a base
FROM node:25-bullseye AS builder

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

ARG NEXT_PUBLIC_API_BACKEND
ARG NEXT_PUBLIC_API_WEBSOCKET_ENDPOINT
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ARG NEXT_PUBLIC_PLAUSIBLE_SRC
ARG NEXT_PUBLIC_EMAIL_ADDRESS_CONTACT
ARG NEXT_PUBLIC_URL_GEOPORTAL
ARG NEXT_PUBLIC_URL_EVENT_CALENDAR
ARG NEXT_PUBLIC_URL_RIS_CALENDAR
ARG NEXT_PUBLIC_URL_WGA_CALENDAR

ENV NEXT_PUBLIC_API_BACKEND=$NEXT_PUBLIC_API_BACKEND
ENV NEXT_PUBLIC_API_WEBSOCKET_ENDPOINT=$NEXT_PUBLIC_API_WEBSOCKET_ENDPOINT
ENV NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ENV NEXT_PUBLIC_PLAUSIBLE_SRC=$NEXT_PUBLIC_PLAUSIBLE_SRC
ENV NEXT_PUBLIC_EMAIL_ADDRESS_CONTACT=$NEXT_PUBLIC_EMAIL_ADDRESS_CONTACT
ENV NEXT_PUBLIC_URL_GEOPORTAL=$NEXT_PUBLIC_URL_GEOPORTAL
ENV NEXT_PUBLIC_URL_EVENT_CALENDAR=$NEXT_PUBLIC_URL_EVENT_CALENDAR
ENV NEXT_PUBLIC_URL_RIS_CALENDAR=$NEXT_PUBLIC_URL_RIS_CALENDAR
ENV NEXT_PUBLIC_URL_WGA_CALENDAR=$NEXT_PUBLIC_URL_WGA_CALENDAR

# Build the Next.js app
RUN pnpm build

# ---- Production image ----
# Use a minimal runtime image for production
FROM node:25-alpine AS runner

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