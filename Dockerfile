# --- Build Stage ---
FROM node:lts-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Build the Next.js app (generates .next folder)
RUN npm run build

LABEL maintainer="Tuan Anh (Bill Nguyen) <animusmion@gmail.com>" \
      project="Neural Network Guide" \
      description="Interactive visualization app for supervised ML models"


# --- Production Stage ---
FROM node:lts-alpine AS production

WORKDIR /app

# Only copy production files
COPY --from=build /app/.next .next
COPY --from=build /app/public public
COPY --from=build /app/package*.json ./

RUN npm install --production

# Use Next.js built-in start command
CMD ["npm", "start"]
