# Bảng Điều Khiển Chất Lượng Không Khí (AQI Dashboard)

Dự án này là một ứng dụng Web (được phát triển trong khuôn khổ AWS First Cloud AI Journey) cho phép người dùng theo dõi chỉ số chất lượng không khí (AQI), nồng độ bụi mịn PM2.5 và PM10 theo thời gian thực (từng giờ) tại các trạm quan trắc lớn ở Việt Nam.

## Tính Năng Nổi Bật

- **Dữ liệu Thời gian thực & Dự báo**: Hiển thị dữ liệu 5 giờ trước, hiện tại và dự báo 5 giờ tới dựa trên toạ độ thực tế.
- **Tự động Cập nhật**: Giao diện React tự động fetch dữ liệu mới mỗi 5 phút.
- **Giao diện Hiện đại (Premium UI)**: Sử dụng phong cách Glassmorphism (hiệu ứng kính mờ), Dark Mode, cùng với thư viện Chart.js để biểu diễn biểu đồ trực quan, đẹp mắt.
- **Container Hóa Toàn Diện**: Ứng dụng đã được đóng gói bằng Docker cho cả Backend (Flask) và Frontend (Nginx đa bước build) để sẵn sàng deploy lên môi trường Cloud (AWS).

## Công Nghệ Sử Dụng

- **Frontend**: ReactJS (khởi tạo bằng Vite), Chart.js, Vanilla CSS.
- **Backend**: Python, Flask, Flask-CORS.
- **Data Source**: Open-Meteo Air Quality API (dữ liệu từ CAMS Châu Âu).
- **DevOps**: Docker & Docker Compose.

---

## Hướng Dẫn Chạy Môi Trường Local (Cục Bộ)

### Yêu Cầu
- Đã cài đặt **Python 3.10+**
- Đã cài đặt **Node.js 18+**

### 1. Chạy Backend (Flask)
Mở terminal và di chuyển vào thư mục `backend`:
```bash
cd backend
python -m venv venv
venv\Scripts\activate   # (Hoặc source venv/bin/activate trên Mac/Linux)
pip install -r requirements.txt
python app.py
```
*Backend sẽ chạy tại: `http://localhost:5000`*

### 2. Chạy Frontend (React)
Mở một terminal khác và di chuyển vào thư mục `frontend`:
```bash
cd frontend
npm install
npm run dev
```
*Frontend sẽ chạy tại: `http://localhost:5173`*

---

## Hướng Dẫn Chạy Bằng Docker

Thay vì cài đặt môi trường rườm rà, bạn có thể chạy toàn bộ ứng dụng chỉ bằng **Docker**. (Yêu cầu phải có Docker Desktop đang chạy).

### 1. Build & Chạy Backend
```bash
cd backend
docker build -t aqi-backend .
docker run -p 5000:5000 aqi-backend
```

### 2. Build & Chạy Frontend (Tối ưu Multi-stage build)
```bash
cd frontend
docker build -t aqi-frontend .
docker run -p 80:80 aqi-frontend
```
Sau đó truy cập `http://localhost:80` trên trình duyệt để thưởng thức thành quả!

---
*Dự án thuộc chương trình: **AWS First Cloud AI Journey***
