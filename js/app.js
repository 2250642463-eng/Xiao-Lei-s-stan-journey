// 应用初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('应用已加载');
    init();
});

function init() {
    // 初始化代码
    setupEventListeners();
}

function setupEventListeners() {
    // 导航链接点击事件
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').slice(1);
            console.log(`导航到: ${target}`);
            // 在这里添加路由逻辑
        });
    });
}

// 工具函数
const utils = {
    // API 请求
    async fetchData(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error('请求失败:', error);
            return null;
        }
    }
};
