
FROM node:20-alpine
 
WORKDIR /app
 
# Install deps first (cache-friendly layer)
COPY package*.json ./
RUN npm ci --omit=dev
 
# Copy app source
COPY backend ./backend
COPY frontend ./frontend
 
ENV PORT=3000
ENV NODE_ENV=production
EXPOSE 3000
 
CMD ["node", "backend/server.js"]