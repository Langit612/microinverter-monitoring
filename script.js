document.addEventListener('DOMContentLoaded', () => {
    // 模拟或从API获取数据
    const fetchData = async () => {
        // 后端API调用示例（详见后端部分）
        const response = await fetch('/api/microinverters'); // 或 'https://your-backend.com/api'
        const data = await response.json();
        updateUI(data);
    };
    
    const updateUI = (data) => {
        document.getElementById('last-updated').textContent = data.lastUpdated;
        document.getElementById('pv1-power-11').textContent = data.mi11.pv1.power + ' W';
        // 更新其他元素...
    };
    
    // 图表配置
    const ctx = document.getElementById('power-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1/18 15:00', '1/18 18:00', /* ... 时间标签 */],
            datasets: [
                { label: 'PV1 Power', data: [150, 200, /* ... */], borderColor: 'blue', yAxisID: 'power' },
                { label: 'PV2 Power', data: [250, 300, /* ... */], borderColor: 'green', yAxisID: 'power' },
                { label: 'Temperature', data: [20, 15, /* ... */], borderColor: 'orange', yAxisID: 'temp' }
            ]
        },
        options: {
            scales: {
                power: { type: 'linear', position: 'left', title: { display: true, text: 'Power (W)' } },
                temp: { type: 'linear', position: 'right', title: { display: true, text: 'Temperature (°C)' } }
            }
        }
    });
    
    // 实时更新：每5秒轮询
    setInterval(fetchData, 5000);
    fetchData(); // 初始加载
    
    // 下载功能
    document.querySelector('.btn-secondary:nth-child(1)').addEventListener('click', () => {
        // 使用html2canvas或Chart.js内置下载PNG
        chart.toBlob(blob => { /* 保存为PNG */ });
    });
    // CSV下载：使用PapaParse或自定义生成CSV
});