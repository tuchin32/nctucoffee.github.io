// 成員卡片生成函式
function createMemberCard(member) {
    // 根據 university 決定系所徽章顏色
    const departmentBadgeStyle = member.university === 0 
      ? 'badge bg-blueviolet' // NTHU
      : 'badge bg-primary';   // NCTU
    
    // 根據 bachelor 決定年份徽章類型
    const yearBadgeClass = member.bachelor === 0 
      ? 'badge bg-dark'       // Master
      : 'badge bg-secondary'; // Bachelor
    
    // 處理第二個 title
    const memberTitle2 = member.title2 ? ` ${member.title2}` : '';

    // 處理第二個 symbol
    const symbolElement2 = member.svgSymbol2
      ? `<svg class="bi" width="1.3em" height="1.3em" style="margin-left: 10px;">
          <use xlink:href="${member.svgSymbol2}" />
        </svg>`
      : '';
    
    // 處理第二個 department
    const departmentElement2 = member.department2
      ? `<span class="${departmentBadgeStyle}">${member.department2}</span>`
      : '';
    
    // 處理缺勤進度條和文字
    const absentElement = member.progress < 100
      ? `<span class="progress" role="progressbar" style="margin-top: 10px; width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
      <span class="progress-bar bg-secondary" style="width: ${member.progress}%">${member.progress}%</span>
      </span>`
      : '';
    const disappear = member.progress < 100 ? 'text-secondary' : '';

    // 處理 title 特殊狀況
    const titleElement = member.title === 'LOST'
      ? `<span class="badge bg-danger">LOST</span>`
      : `${member.title}${memberTitle2}`;
    
    // 處理 department 特殊狀況
    const departmentElement = member.department === 'LOST'
      ? `<span class="badge bg-danger">LOST</span>`
      : `<span class="${departmentBadgeStyle}">${member.department}</span>`;

    // 處理普通社員的其他資訊
    const otherInfoElement = member.general
      ? `<p style="margin-top: -20px;"><span class="badge bg-success">${member.general}</span></p>`
      : '';
    

    return `
    <div class="col d-flex flex-column gap-2">
      <div class="feature-icon-small d-inline-flex text-bg-primary bg-gradient fs-4 rounded-3">
        <svg class="bi" width="1.3em" height="1.3em">
          <use xlink:href="${member.svgSymbol}" />
        </svg>
        ${symbolElement2}
      </div>
      <h4 class="fw-semibold mb-0 text-body-emphasis ${disappear}">${titleElement}</h4>
      <h6 class="mb-0 ${disappear}">${member.name}</h6>
      <p>
        <span class="${yearBadgeClass}">${member.year}</span>
        ${departmentElement}
        ${departmentElement2}
        ${absentElement}
      </p>
      ${otherInfoElement}
    </div>
  `;
}

// 載入並渲染成員資料
function renderMembers(alumniGroup = 'alumni_12') {
  fetch('members.json')
    .then(response => response.json())
    .then(data => {
      const membersContainer = document.getElementById('membercards');
      if (membersContainer) {
        const membersHTML = data[alumniGroup]
          .map(member => createMemberCard(member))
          .join('');
        membersContainer.innerHTML = membersHTML;
      } else {
        console.error('Members container not found');
      }
    })
    .catch(error => {
      console.error('Error loading members:', error);
    });
}

// 根據當前頁面決定渲染哪個屆別
document.addEventListener('DOMContentLoaded', () => {
  const fileName = window.location.pathname.split('/').pop();
  const alumniMatch = fileName.match(/alumni_(\d+|others)\.html/);
  
  if (alumniMatch) {
    const alumniGroup = alumniMatch[1] === 'others' 
      ? 'alumni_others' 
      : `alumni_${alumniMatch[1]}`;
    renderMembers(alumniGroup);
  }
});