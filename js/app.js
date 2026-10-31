const demoButton = document.querySelector('#demoButton');
const statusText = document.querySelector('#statusText');

demoButton.addEventListener('click', () => {
  statusText.textContent = 'Đã chạy thử (dữ liệu mẫu).';
});

// TODO: kết nối API, biểu đồ cảm biến và xử lý lỗi.
