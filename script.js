document.addEventListener('DOMContentLoaded', function() {
    // 主题切换功能
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    themeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
    });

    // Fancybox 配置
    Fancybox.bind("[data-fancybox]", {
        // 自定义选项
        loop: true,
        buttons: [
            "zoom",
            "slideShow",
            "fullScreen",
            "close"
        ],
    });

    // 响应式导航栏
    const navList = document.querySelector('nav ul');
    const menuButton = document.createElement('button');
    menuButton.innerHTML = '菜单';
    menuButton.classList.add('md:hidden', 'text-blue-500', 'hover:text-blue-700');
    
    menuButton.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    if (window.innerWidth <= 1024) {
        document.querySelector('nav').insertBefore(menuButton, navList);
    }

    // 简化图片加载处理
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.style.opacity = '1';  // 直接显示作品
    });

    // 添加虚拟宠物功能
    const pet = document.getElementById('virtual-pet');
    const petDialog = document.getElementById('pet-dialog');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    const dialogMessages = [
        "主人好~(｡･ω･｡)",
        "今天也要加油哦！٩(๑❛ᴗ❛๑)۶",
        "要不要休息一下？(。-ω-)zzz",
        "我陪你！(★ ω ★)",
        "这个作品真棒！(｡♥‿♥｡)",
        "主人最棒了！(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
        "需要我帮忙吗？(◕‿◕✿)",
        "今天天气真好呢~(●'◡'●)",
        "主人辛苦啦~(づ｡◕‿‿◕｡)づ",
        "让我们一起努力吧！(ง •̀_•́)ง"
    ];

    function showRandomDialog() {
        const randomMessage = dialogMessages[Math.floor(Math.random() * dialogMessages.length)];
        petDialog.textContent = randomMessage;
        petDialog.classList.add('show');
        setTimeout(() => {
            petDialog.classList.remove('show');
        }, 3000);
    }

    // 点击宠物显示对话
    pet.addEventListener('click', showRandomDialog);

    // 拖拽功能
    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === pet) {
            isDragging = true;
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, pet);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    // 添加拖拽事件监听
    pet.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    // 定时显示随机对话
    setInterval(showRandomDialog, 30000); // 每30秒显示一次随机对话
});