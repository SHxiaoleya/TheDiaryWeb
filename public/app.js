let allDiaries = [];

async function loadDiaries() {
  const listEl = document.getElementById('diary-list');

  try {
    const res = await fetch('/api/diaries');
    const diaries = await res.json();

    if (!Array.isArray(diaries)) {
      listEl.innerHTML = `<div class="empty">数据格式错误</div>`;
      return;
    }

    allDiaries = diaries;
    renderDiaries(allDiaries);

    // 绑定搜索
    const input = document.getElementById('search-input');
    input.addEventListener('input', (e) => {
      const keyword = (e.target.value || '').trim().toLowerCase();

      if (!keyword) {
        renderDiaries(allDiaries);
        return;
      }

      const filtered = allDiaries.filter(d => {
        const title = String(d.title || '').toLowerCase();
        const bodyText = htmlToText(d.bodyHtml || '').toLowerCase();
        return title.includes(keyword) || bodyText.includes(keyword);
      });

      renderDiaries(filtered, keyword);
    });

  } catch (e) {
    listEl.innerHTML = `<div class="empty">加载失败：${escapeHtml(e.message)}</div>`;
  }
}

function renderDiaries(diaries, keyword = '') {
  const listEl = document.getElementById('diary-list');

  if (!diaries.length) {
    listEl.innerHTML = `<div class="empty">未找到与“${escapeHtml(keyword)}”相关的日记</div>`;
    return;
  }

  listEl.innerHTML = diaries.map(d => `
    <article class="diary-card">
      <h2 class="diary-title">${escapeHtml(d.title)}</h2>
      <div class="meta">
        <span>📅 日期：${escapeHtml(formatTime(d.date))}</span>
        <span>⛅ 天气：${escapeHtml(d.weather || '-')}</span>
      </div>
      <div class="body">${d.bodyHtml || ''}</div>
    </article>
  `).join('');
}

function formatTime(ts) {
  const n = Number(ts);
  if (!n) return '-';
  const d = new Date(n);

  const Y = d.getFullYear();
  const M = String(d.getMonth() + 1).padStart(2, '0');
  const D = String(d.getDate()).padStart(2, '0');
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');

  return `${Y}-${M}-${D} ${h}:${m}:${s}`;
}

// 将 HTML 正文转纯文本用于搜索
function htmlToText(html) {
  return String(html)
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

loadDiaries();
