# Sử dụng Python bản siêu nhẹ
FROM python:3.10-slim

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Copy file requirements và cài đặt thư viện
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 5000 (cổng mặc định của Flask)
EXPOSE 5000

# Lệnh khởi chạy server
CMD ["python", "app.py"] 
# (Hoặc thay bằng gunicorn nếu bạn cấu hình chạy production)
