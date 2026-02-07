const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const JSZip = require('jszip');

const router = express.Router();

function getTemplateDir(theme) {
  const allowed = ['minimal', 'modern', 'creative', 'classic', 'professional'];
  if (!allowed.includes(theme)) theme = 'minimal';
  return path.join(__dirname, '..', 'templates', theme);
}

function renderPortfolio(data, theme) {
  const dir = getTemplateDir(theme);
  const templatePath = path.join(dir, 'index.ejs');
  const template = fs.readFileSync(templatePath, 'utf-8');
  const cssPath = path.join(dir, 'style.css');
  const css = fs.readFileSync(cssPath, 'utf-8');
  const html = ejs.render(template, { data, css, embedded: true });
  return { html, css };
}

router.post('/preview', (req, res) => {
  try {
    const { data, theme } = req.body;
    const { html } = renderPortfolio(data || {}, theme || 'minimal');
    res.json({ html });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/export', async (req, res) => {
  try {
    const { data, theme } = req.body;
    const dir = getTemplateDir(theme || 'minimal');
    const cssPath = path.join(dir, 'style.css');
    const css = fs.readFileSync(cssPath, 'utf-8');
    const templatePath = path.join(dir, 'index.ejs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    const html = ejs.render(template, { data: data || {}, css, embedded: false });

    const zip = new JSZip();
    zip.file('index.html', html);
    zip.file('style.css', css);

    const buffer = await zip.generateAsync({ type: 'nodebuffer' });
    res.set({
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="portfolio-${theme || 'minimal'}.zip"`,
    });
    res.send(buffer);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
