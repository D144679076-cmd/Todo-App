# Build stage
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY api/ ./api/
COPY database/ ./database/
# Build TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install 

# Copy built files from builder stage
COPY --from=builder /app/dist ./dist

# # Set environment variables
# ENV NODE_ENV=production

# Expose port
EXPOSE 8055

# Start the application
CMD ["node", "dist/index.js"]