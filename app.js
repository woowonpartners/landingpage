// Navigation Toggle for Mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when scrolling
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (navMenu && navMenu.classList.contains('active')) {
        // Close menu if scrolled significantly
        if (Math.abs(currentScroll - lastScroll) > 50) {
            navMenu.classList.remove('active');
        }
    }
    
    lastScroll = currentScroll;
});

// ------------------------------
// 인사이트 / 공지 (Google Sheets 연동)
// ------------------------------

const INSIGHTS_SHEET_CSV_URL =
    'https://docs.google.com/spreadsheets/d/1Fkf2sM_3wbZQQ2uF1UFjgWqOJmxd2uqVhLunjI7dklk/gviz/tq?tqx=out:csv&sheet=공지';
const INSIGHTS_PER_PAGE = 5;

let insightsData = [];
let insightsCurrentPage = 1;

/**
 * 간단 CSV 파서 (따옴표와 콤마 처리)
 */
function parseCsv(text) {
    const rows = [];
    let current = '';
    let inQuotes = false;
    const lineBreak = /\r?\n/;

    const chars = text.split('');
    const lines = [];
    let line = [];

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const nextChar = chars[i + 1];

        if (char === '"' && inQuotes && nextChar === '"') {
            // 이스케이프된 따옴표 ("")
            current += '"';
            i++; // 다음 따옴표 스킵
        } else if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            line.push(current);
            current = '';
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (current !== '' || line.length > 0) {
                line.push(current);
                rows.push(line);
                line = [];
                current = '';
            }
        } else {
            current += char;
        }
    }

    if (current !== '' || line.length > 0) {
        line.push(current);
        rows.push(line);
    }

    return rows;
}

function mapCsvToObjects(csvText) {
    const rows = parseCsv(csvText);
    if (!rows.length) return [];

    const headers = rows[0].map(h => h.trim());
    const dataRows = rows.slice(1);

    return dataRows
        .map(cols => {
            const obj = {};
            headers.forEach((header, idx) => {
                obj[header] = cols[idx] ? cols[idx].trim() : '';
            });
            return obj;
        })
        .filter(row => row['제목'] && row['제목'].length > 0);
}

function renderInsightsPage(page) {
    const listEl = document.getElementById('insights-list');
    const pageInfoEl = document.getElementById('insights-page-info');
    const prevBtn = document.getElementById('insights-prev');
    const nextBtn = document.getElementById('insights-next');

    if (!listEl || !pageInfoEl || !prevBtn || !nextBtn) return;

    const total = insightsData.length;
    const totalPages = Math.max(1, Math.ceil(total / INSIGHTS_PER_PAGE));

    insightsCurrentPage = Math.min(Math.max(1, page), totalPages);

    listEl.innerHTML = '';

    if (total === 0) {
        listEl.innerHTML = '<p>등록된 공지가 없습니다.</p>';
        pageInfoEl.textContent = '';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    const start = (insightsCurrentPage - 1) * INSIGHTS_PER_PAGE;
    const end = Math.min(start + INSIGHTS_PER_PAGE, total);
    const pageItems = insightsData.slice(start, end);

    pageItems.forEach(item => {
        const date = item['수정일'] || item['작성일'] || '';
        const title = item['제목'] || '제목 없음';
        const body = item['본문'] || '';
        const attachmentName = item['첨부파일명'] || '';
        const attachmentUrl = item['첨부파일'] || '';

        let attachmentHtml = '';
        if (attachmentUrl) {
            const linkText = attachmentName || '첨부파일 다운로드';
            attachmentHtml = `<p class="insight-attachment">첨부파일: <a href="${attachmentUrl}" target="_blank" rel="noopener">${linkText}</a></p>`;
        } else if (attachmentName) {
            attachmentHtml = `<p class="insight-attachment">첨부파일: ${attachmentName}</p>`;
        }

        const card = document.createElement('div');
        card.className = 'insight-card';
        card.innerHTML = `
            <button class="insight-header" type="button">
                <div class="insight-header-main">
                    <div class="insight-date">${date}</div>
                    <h3>${title}</h3>
                </div>
                <span class="insight-toggle">›</span>
            </button>
            <div class="insight-body">
                ${body ? `<p>${body}</p>` : ''}
                ${attachmentHtml}
            </div>
        `;

        const header = card.querySelector('.insight-header');
        if (header) {
            header.addEventListener('click', () => {
                card.classList.toggle('open');
            });
        }

        listEl.appendChild(card);
    });

    pageInfoEl.textContent = `${insightsCurrentPage} / ${totalPages}`;
    prevBtn.disabled = insightsCurrentPage <= 1;
    nextBtn.disabled = insightsCurrentPage >= totalPages;
}

async function loadInsightsFromSheet() {
    try {
        const response = await fetch(INSIGHTS_SHEET_CSV_URL);
        if (!response.ok) {
            throw new Error('Failed to load insights data');
        }
        const text = await response.text();
        insightsData = mapCsvToObjects(text);
        renderInsightsPage(1);
    } catch (error) {
        const listEl = document.getElementById('insights-list');
        if (listEl) {
            listEl.innerHTML = '<p>공지 데이터를 불러오는 중 오류가 발생했습니다.</p>';
        }
        // 콘솔에만 로그
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('insights-prev');
    const nextBtn = document.getElementById('insights-next');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            renderInsightsPage(insightsCurrentPage - 1);
        });

        nextBtn.addEventListener('click', () => {
            renderInsightsPage(insightsCurrentPage + 1);
        });
    }

    loadInsightsFromSheet();
});
