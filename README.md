# ForgeSight — Predictive Maintenance Dashboard

Dashboard HTML/CSS/JavaScript thuần cho đội vận hành nhà máy: theo dõi sức khỏe thiết bị, cảnh báo rủi ro và lọc danh sách thiết bị.

## Cấu trúc

- `index.html`: shell và các vùng dữ liệu của dashboard
- `css/style.css`: giao diện responsive, trạng thái và layout
- `js/app.js`: dữ liệu mô phỏng, biểu đồ, lọc tìm kiếm và tương tác
- `assets/`: nơi để bổ sung tài nguyên khi kết nối dữ liệu thật

Mở `index.html` trực tiếp trong trình duyệt để chạy. Dữ liệu hiện là dữ liệu mô phỏng; khi tích hợp backend, thay mảng `equipment` và `alerts` trong `js/app.js` bằng API.
