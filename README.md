# The Diary Web

一个简洁美观的日记展示网站，主色调为浅蓝和浅粉。  
支持从项目目录下读取 `.md` 文件并展示日记内容，包含标题、日期、天气与正文，同时支持关键词搜索（标题 + 正文）。

---
## 🖼 截图展示
!<img width="1419" height="767" alt="image" src="https://github.com/user-attachments/assets/133f9f2e-f333-481b-9a4c-587c5838e969" />

---

## 📌 项目特色

- 浅蓝 + 浅粉配色，界面清新简洁
- 自动读取 `diaries/` 目录中的 Markdown 日记文件
- 展示字段固定为：
  - 标题（title）
  - 日期（date，建议使用毫秒时间戳）
  - 天气（weather）
  - 正文（Markdown 渲染）
- 按日期倒序展示（新日志优先）
- 支持实时搜索标题和正文关键词

---

## 🧱 技术栈

- **Node.js**
- **Express**
- **gray-matter**（解析 Markdown Front Matter）
- **marked**（Markdown 转 HTML）
- 前端原生 HTML + CSS + JavaScript

---

## ✅ 环境要求

- Node.js >= 16（推荐 Node.js 18+）
- npm >= 8
- 现代浏览器（Chrome / Edge / Firefox / Safari）

---

## 📂 项目结构

```
diary-site/
├─ server.js
├─ package.json
├─ diaries/
│  ├─ 2026-04-28.md
│  └─ 2026-04-29.md
└─ public/
   ├─ index.html
   ├─ style.css
   └─ app.js
```

---

## 🚀 安装与运行

1. 克隆项目

```bash
git clone <your-repo-url>.git
cd diary-site
```

2. 安装依赖

```bash
npm install
```

3.启动项目

```bash
node server.js
```

4.打开浏览器访问

```bash
http://localhost:3000
```

---

## ✍️ 日记文件格式说明

请将日记文件放在`diaries/`目录下，扩展名为`.md`。

推荐使用如下格式（YAML Front Matter + Markdown 正文）：

```md
---
title: 春日散步
date: 1745769600000
weather: 晴
---

今天傍晚去公园散步，风很轻，晚霞很温柔。

- 看见了两只小猫
- 买了一杯草莓气泡水
- 回家路上听了喜欢的歌
```

### 字段说明

- `title`: 日记标题
- `date`: 日期时间戳（毫秒，例如 1745769600000）
- `weather`: 天气描述
- 正文: 任意 Markdown 内容

---

## 🔍 搜索功能

页面顶部提供搜索框，支持实时搜索：

- 标题关键词
- 正文关键词（会将渲染后的 HTML 提纯文本后匹配）

输入即过滤，清空即恢复全部列表。

---

## 📄 License

本项目基于 MIT License 开源，你可以自由使用、修改和分发。
