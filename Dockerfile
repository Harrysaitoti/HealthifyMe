# Stage 1: Build the React frontend
FROM node:14 as build

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend ./
RUN npm run build

# Stage 2: Serve the frontend with Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
