# Stage 1: Build ứng dụng React
FROM node:18-alpine AS builder
WORKDIR /app
# Copy file quản lý thư viện và cài đặt
COPY package.json package-lock.json* ./
RUN npm install
# Copy toàn bộ code và build ra các file tĩnh (HTML, CSS, JS)
COPY . .
RUN npm run build

# Stage 2: Chạy ứng dụng bằng Nginx
FROM nginx:alpine
# Xóa giao diện mặc định của Nginx
RUN rm -rf /usr/share/nginx/html/*
# Copy các file đã build từ Stage 1 sang thư mục của Nginx
# Lưu ý: Vite mặc định build ra thư mục 'dist' thay vì 'build'
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
