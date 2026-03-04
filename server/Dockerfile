FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package.json ./
COPY server/package.json ./server/

# Install root deps first
RUN npm install

# Install server deps
WORKDIR /app/server
RUN npm install

# Copy server code
COPY server/ ./

EXPOSE 5001

CMD ["node", "server.js"]
