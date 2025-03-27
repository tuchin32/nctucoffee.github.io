// 從當前頁面檔案名自動確定當前啟用的導航項目
function determineCurrentPage() {
    const fileName = window.location.pathname.split('/').pop();
    return fileName.replace('alumni_', '').replace('.html', '');
}

const navConfig = [
    '12', '11', '10', '09', '08', '07', 
    '06', '05', '04', '03', '02', '01', 
    '00', 'others'
].map(text => {
    const currentPage = determineCurrentPage();
    return {
        text: text === 'others' ? '!!' : text,
        isCurrent: currentPage === text,
        link: currentPage === text ? '#' : `./alumni_${text}.html`
    };
});

function generateNavigation() {
    const container = document.createElement('div');
    container.className = 'container px-4 py-5';

    const navList = document.createElement('ul');
    navList.className = 'nav nav-pills';

    navConfig.forEach(item => {
        const listItem = document.createElement('li');
        listItem.className = 'nav-item';

        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.text;
        link.className = `nav-link ${item.isCurrent ? 'active' : 'text-secondary'}`;
        link.style = `${item.isCurrent ? 'background-color: #8d6449;' : ''}`;

        listItem.appendChild(link);
        navList.appendChild(listItem);
    });

    container.appendChild(navList);
    container.appendChild(document.createElement('hr'));
    container.id = 'alumni-nav';  // 新增 id 屬性

    // 替換頁面中的導航區域
    const existingNavContainer = document.getElementById('alumni-nav');
    if (existingNavContainer) {
        existingNavContainer.replaceWith(container);
    } else {
        document.body.insertBefore(container, document.body.firstChild);
    }
}

// 頁面載入時生成導航
document.addEventListener('DOMContentLoaded', generateNavigation);
