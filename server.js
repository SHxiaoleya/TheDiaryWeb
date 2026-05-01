const express = require('express');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const app = express();
const PORT = 3000;
const DIARY_DIR = path.join(__dirname, 'diaries');

// 静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 读取并解析 .md 文件
function getDiaries() {
  if (!fs.existsSync(DIARY_DIR)) return [];

  const files = fs.readdirSync(DIARY_DIR).filter(f => f.endsWith('.md'));

  const diaries = files.map(file => {
    const fullPath = path.join(DIARY_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf-8');

    // 使用 front matter 存标题/日期/天气
    const { data, content } = matter(raw);

return {
  id: file,
  title: data.title || file.replace('.md', ''),
  date: Number(data.date) || 0,   // 时间戳（毫秒）
  weather: data.weather || '',
  bodyHtml: marked.parse(content || '')
};
  });

  // 按日期倒序（可选）
  diaries.sort((a, b) => b.date - a.date);
  return diaries;
}

// API：获取所有日记
app.get('/api/diaries', (req, res) => {
  try {
    const diaries = getDiaries();
    res.json(diaries);
  } catch (err) {
    res.status(500).json({ message: '读取日记失败', error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Diary site running: http://localhost:${PORT}`);
});
