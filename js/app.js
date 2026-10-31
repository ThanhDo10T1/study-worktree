const equipment = [
  { name: 'Máy nén khí A-01', code: 'CMP-001', area: 'Xưởng A', health: 94, status: 'healthy', label: 'Tốt', last: '2 phút trước' },
  { name: 'Bơm thủy lực B-03', code: 'PMP-014', area: 'Xưởng A', health: 72, status: 'watch', label: 'Theo dõi', last: '8 phút trước' },
  { name: 'Động cơ băng tải C-02', code: 'MTR-022', area: 'Xưởng B', health: 48, status: 'critical', label: 'Nguy hiểm', last: '12 phút trước' },
  { name: 'Quạt làm mát D-01', code: 'FAN-008', area: 'Xưởng B', health: 88, status: 'healthy', label: 'Tốt', last: '15 phút trước' },
  { name: 'Máy ép thủy lực A-04', code: 'PRS-006', area: 'Xưởng A', health: 66, status: 'watch', label: 'Theo dõi', last: '21 phút trước' },
  { name: 'Băng tải thành phẩm B-01', code: 'CVR-019', area: 'Xưởng B', health: 91, status: 'healthy', label: 'Tốt', last: '26 phút trước' }
];
const alerts = [
  { device: 'Động cơ băng tải C-02', detail: 'Rung động vượt ngưỡng 4.8 mm/s', time: '12 phút trước', status: 'critical' },
  { device: 'Bơm thủy lực B-03', detail: 'Nhiệt độ tăng 12°C trong 30 phút', time: '38 phút trước', status: 'watch' },
  { device: 'Máy ép thủy lực A-04', detail: 'Chu kỳ vận hành chậm hơn 8%', time: '1 giờ trước', status: 'watch' }
];
const rows = document.querySelector('#equipmentRows');
const emptyState = document.querySelector('#emptyState');
const toast = document.querySelector('#toast');
let toastTimer;

function renderAlerts() {
  document.querySelector('#alertList').innerHTML = alerts.map((alert) => `<div class="alert-row"><span class="alert-dot ${alert.status === 'watch' ? 'watch' : ''}"></span><div><strong>${alert.device}</strong><p>${alert.detail}</p></div><time>${alert.time}</time></div>`).join('');
}

function renderEquipment() {
  const query = document.querySelector('#searchInput').value.trim().toLowerCase();
  const filter = document.querySelector('#statusFilter').value;
  const visible = equipment.filter((item) => (filter === 'all' || item.status === filter) && `${item.name} ${item.code} ${item.area}`.toLowerCase().includes(query));
  rows.innerHTML = visible.map((item) => `<tr><td><span class="device-name">${item.name}</span><span class="device-code">${item.code}</span></td><td>${item.area}</td><td><div class="health-cell"><span class="health-bar"><span class="${item.status}" style="width:${item.health}%"></span></span><span class="health-number">${item.health}/100</span></div></td><td><span class="status ${item.status}">${item.label}</span></td><td>${item.last}</td><td><button class="row-action" aria-label="Xem ${item.name}" data-toast="Đang mở thông tin ${item.name}...">···</button></td></tr>`).join('');
  emptyState.hidden = visible.length > 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

renderAlerts();
renderEquipment();
document.querySelector('#searchInput').addEventListener('input', renderEquipment);
document.querySelector('#statusFilter').addEventListener('change', renderEquipment);
document.querySelector('#periodSelect').addEventListener('change', (event) => {
  const days = event.target.value;
  document.querySelector('#chartSummary').textContent = `Xu hướng ${days} ngày gần nhất · 3 cảnh báo cần xử lý`;
  showToast(`Đã cập nhật khoảng thời gian: ${days} ngày`);
});
document.querySelector('#analysisButton').addEventListener('click', (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.innerHTML = '<span>⋯</span> Đang phân tích';
  setTimeout(() => {
    button.disabled = false;
    button.innerHTML = '<span>✓</span> Đã cập nhật';
    showToast('Phân tích hoàn tất — dữ liệu đã được cập nhật');
    setTimeout(() => { button.innerHTML = '<span>＋</span> Chạy phân tích'; }, 2200);
  }, 900);
});
document.addEventListener('click', (event) => {
  const target = event.target.closest('[data-toast]');
  if (target) showToast(target.dataset.toast);
  if (event.target.closest('.mobile-menu')) document.querySelector('.sidebar').classList.toggle('open');
  if (event.target.closest('.sidebar .nav-link')) document.querySelector('.sidebar').classList.remove('open');
});
