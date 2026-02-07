const steps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const progressFill = document.querySelector('.progress-fill');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const exportBtn = document.getElementById('export-btn');
const exportZipBtn = document.getElementById('export-zip-btn');
const resetBtn = document.getElementById('reset-btn');
const previewFrame = document.getElementById('preview-frame');
const saveIndicator = document.getElementById('save-indicator');
const toastEl = document.getElementById('toast');

let currentStep = 0;
const totalSteps = steps.length;

function showToast(msg, type) {
  toastEl.textContent = msg;
  toastEl.className = 'toast ' + type;
  requestAnimationFrame(() => toastEl.classList.add('show'));
  setTimeout(() => toastEl.classList.remove('show'), 2500);
}

function updateStep() {
  steps.forEach((s, i) => s.classList.toggle('active', i === currentStep));
  progressSteps.forEach((s, i) => {
    s.classList.toggle('active', i === currentStep);
    s.classList.toggle('done', i < currentStep);
  });
  progressFill.style.width = `${(currentStep / (totalSteps - 1)) * 100}%`;
  prevBtn.disabled = currentStep === 0;
  nextBtn.textContent = currentStep === totalSteps - 1 ? 'Finish' : 'Next';
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) { currentStep--; updateStep(); }
});

nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps - 1) { currentStep++; updateStep(); }
});

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'TEXTAREA') return;
  if (e.key === 'ArrowRight' && currentStep < totalSteps - 1) { currentStep++; updateStep(); }
  if (e.key === 'ArrowLeft' && currentStep > 0) { currentStep--; updateStep(); }
});

progressSteps.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentStep = parseInt(btn.dataset.step);
    updateStep();
  });
});

const templates = {
  experience: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Company</label><input type="text" data-field="company" placeholder="Acme Inc."></div>
        <div class="form-group"><label>Position</label><input type="text" data-field="position" placeholder="Frontend Developer"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Start Date</label><input type="text" data-field="startDate" placeholder="Jan 2022"></div>
        <div class="form-group"><label>End Date</label><input type="text" data-field="endDate" placeholder="Present"></div>
      </div>
      <div class="form-group"><label>City / Country</label><input type="text" data-field="location" placeholder="Istanbul, Turkey"></div>
      <div class="form-group"><label>Description</label><textarea data-field="description" rows="2" placeholder="Key responsibilities and achievements..."></textarea></div>
    </div>`,
  education: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Institution</label><input type="text" data-field="school" placeholder="MIT"></div>
        <div class="form-group"><label>Degree / Program</label><input type="text" data-field="degree" placeholder="BSc Computer Science"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Start Date</label><input type="text" data-field="startDate" placeholder="2018"></div>
        <div class="form-group"><label>End Date</label><input type="text" data-field="endDate" placeholder="2022"></div>
      </div>
      <div class="form-group"><label>City / Country</label><input type="text" data-field="location" placeholder="Cambridge, USA"></div>
      <div class="form-group"><label>Description / GPA</label><textarea data-field="description" rows="2" placeholder="GPA: 3.8/4.0, Relevant coursework..."></textarea></div>
    </div>`,
  skills: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Skill</label><input type="text" data-field="name" placeholder="JavaScript"></div>
        <div class="form-group"><label>Level</label>
          <select data-field="level">
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced" selected>Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>
      <div class="form-group"><label>Category</label>
        <select data-field="category">
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Database">Database</option>
          <option value="DevOps">DevOps</option>
          <option value="Mobile">Mobile</option>
          <option value="Tools">Tools</option>
          <option value="Other">Other</option>
        </select>
      </div>
    </div>`,
  languages: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Language</label><input type="text" data-field="name" placeholder="English"></div>
        <div class="form-group"><label>Proficiency</label>
          <select data-field="level">
            <option value="A1">A1 - Beginner</option>
            <option value="A2">A2 - Elementary</option>
            <option value="B1">B1 - Intermediate</option>
            <option value="B2" selected>B2 - Upper Intermediate</option>
            <option value="C1">C1 - Advanced</option>
            <option value="C2">C2 - Proficient</option>
            <option value="Native">Native</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Listening</label>
          <select data-field="listening"><option value="">--</option><option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option><option value="C1">C1</option><option value="C2">C2</option></select>
        </div>
        <div class="form-group"><label>Reading</label>
          <select data-field="reading"><option value="">--</option><option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option><option value="C1">C1</option><option value="C2">C2</option></select>
        </div>
        <div class="form-group"><label>Speaking</label>
          <select data-field="speaking"><option value="">--</option><option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option><option value="C1">C1</option><option value="C2">C2</option></select>
        </div>
        <div class="form-group"><label>Writing</label>
          <select data-field="writing"><option value="">--</option><option value="A1">A1</option><option value="A2">A2</option><option value="B1">B1</option><option value="B2">B2</option><option value="C1">C1</option><option value="C2">C2</option></select>
        </div>
      </div>
    </div>`,
  projects: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-group"><label>Project Name</label><input type="text" data-field="name" placeholder="My Awesome Project"></div>
      <div class="form-group"><label>Description</label><textarea data-field="description" rows="2" placeholder="What does this project do?"></textarea></div>
      <div class="form-group"><label>Technologies</label><input type="text" data-field="tech" placeholder="React, Node.js, MongoDB"></div>
      <div class="form-row">
        <div class="form-group"><label>Demo URL</label><input type="url" data-field="demo" placeholder="https://demo.com"></div>
        <div class="form-group"><label>GitHub URL</label><input type="url" data-field="github" placeholder="https://github.com/..."></div>
      </div>
    </div>`,
  certifications: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Certification Name</label><input type="text" data-field="name" placeholder="AWS Solutions Architect"></div>
        <div class="form-group"><label>Issuing Organization</label><input type="text" data-field="issuer" placeholder="Amazon Web Services"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Date Obtained</label><input type="text" data-field="date" placeholder="March 2023"></div>
        <div class="form-group"><label>Credential ID</label><input type="text" data-field="credentialId" placeholder="ABC-123-XYZ"></div>
      </div>
      <div class="form-group"><label>Credential URL</label><input type="url" data-field="url" placeholder="https://verify.cert.com/..."></div>
    </div>`,
  awards: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Award Title</label><input type="text" data-field="title" placeholder="Best Innovation Award"></div>
        <div class="form-group"><label>Issuer</label><input type="text" data-field="issuer" placeholder="TechConf 2023"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Date</label><input type="text" data-field="date" placeholder="2023"></div>
      </div>
      <div class="form-group"><label>Description</label><textarea data-field="description" rows="2" placeholder="Details about the award..."></textarea></div>
    </div>`,
  volunteering: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Organization</label><input type="text" data-field="organization" placeholder="Red Cross"></div>
        <div class="form-group"><label>Role</label><input type="text" data-field="role" placeholder="Volunteer Developer"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Start Date</label><input type="text" data-field="startDate" placeholder="2021"></div>
        <div class="form-group"><label>End Date</label><input type="text" data-field="endDate" placeholder="Present"></div>
      </div>
      <div class="form-group"><label>Description</label><textarea data-field="description" rows="2" placeholder="What you did..."></textarea></div>
    </div>`,
  references: () => `
    <div class="dynamic-item">
      <button class="remove-item" type="button">&times;</button>
      <div class="form-row">
        <div class="form-group"><label>Name</label><input type="text" data-field="name" placeholder="Jane Smith"></div>
        <div class="form-group"><label>Position</label><input type="text" data-field="position" placeholder="CTO at Acme Inc."></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Email</label><input type="email" data-field="email" placeholder="jane@acme.com"></div>
        <div class="form-group"><label>Phone</label><input type="tel" data-field="phone" placeholder="+1 234 567 8900"></div>
      </div>
      <div class="form-group"><label>Relationship</label><input type="text" data-field="relationship" placeholder="Former Manager"></div>
    </div>`,
};

document.querySelectorAll('.add-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.target;
    const list = document.getElementById(`${target}-list`);
    const html = templates[target]();
    list.insertAdjacentHTML('beforeend', html);
    const item = list.lastElementChild;
    item.querySelector('.remove-item').addEventListener('click', () => {
      item.remove();
      debouncedPreview();
    });
    item.querySelectorAll('input, textarea, select').forEach((el) => {
      el.addEventListener('input', debouncedPreview);
    });
    debouncedPreview();
  });
});

document.querySelectorAll('.theme-card').forEach((card) => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.theme-card').forEach((c) => c.classList.remove('active'));
    card.classList.add('active');
    debouncedPreview();
  });
});

document.querySelectorAll('.preview-size-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preview-size-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    previewFrame.style.width = btn.dataset.width;
  });
});

function val(id) {
  const el = document.getElementById(id);
  if (!el) return '';
  if (el.tagName === 'SELECT') return el.value;
  return el.value.trim();
}

function setVal(id, value) {
  const el = document.getElementById(id);
  if (!el || !value) return;
  el.value = value;
}

function collectDynamic(listId) {
  const items = [];
  document.querySelectorAll(`#${listId} .dynamic-item`).forEach((item) => {
    const entry = {};
    item.querySelectorAll('[data-field]').forEach((field) => {
      entry[field.dataset.field] = field.value.trim();
    });
    const hasValue = Object.values(entry).some((v) => v);
    if (hasValue) items.push(entry);
  });
  return items;
}

function collectFormData() {
  return {
    fullName: val('fullName'),
    title: val('title'),
    about: val('about'),
    photo: val('photo'),
    dob: val('dob'),
    gender: val('gender'),
    nationality: val('nationality'),
    drivingLicense: val('drivingLicense'),
    email: val('email'),
    phone: val('phone'),
    address: val('address'),
    city: val('city'),
    country: val('country'),
    postalCode: val('postalCode'),
    github: val('github'),
    linkedin: val('linkedin'),
    twitter: val('twitter'),
    website: val('website'),
    experience: collectDynamic('experience-list'),
    education: collectDynamic('education-list'),
    skills: collectDynamic('skills-list'),
    languages: collectDynamic('languages-list'),
    projects: collectDynamic('projects-list'),
    certifications: collectDynamic('certifications-list'),
    awards: collectDynamic('awards-list'),
    volunteering: collectDynamic('volunteering-list'),
    interests: val('interests'),
    references: collectDynamic('references-list'),
  };
}

function getTheme() {
  const checked = document.querySelector('input[name="theme"]:checked');
  return checked ? checked.value : 'minimal';
}

let previewTimer;
function debouncedPreview() {
  clearTimeout(previewTimer);
  previewTimer = setTimeout(() => {
    updatePreview();
    saveToStorage();
  }, 300);
}

async function updatePreview() {
  const data = collectFormData();
  const theme = getTheme();
  try {
    const res = await fetch('/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, theme }),
    });
    const result = await res.json();
    if (result.html) {
      const doc = previewFrame.contentDocument;
      doc.open();
      doc.write(result.html);
      doc.close();
    }
  } catch { /* preview unavailable */ }
}

document.querySelectorAll('.form-panel input, .form-panel textarea, .form-panel select').forEach((el) => {
  el.addEventListener('input', debouncedPreview);
});

function saveToStorage() {
  try {
    const data = collectFormData();
    data._theme = getTheme();
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    saveIndicator.textContent = 'Auto-saved';
    setTimeout(() => { saveIndicator.textContent = ''; }, 2000);
  } catch {}
}

function loadDynamicItems(key, items) {
  if (!items || !items.length) return;
  const list = document.getElementById(`${key}-list`);
  const addBtn = document.querySelector(`[data-target="${key}"]`);
  if (!list || !addBtn) return;
  items.forEach(item => {
    list.insertAdjacentHTML('beforeend', templates[key]());
    const el = list.lastElementChild;
    el.querySelector('.remove-item').addEventListener('click', () => {
      el.remove();
      debouncedPreview();
    });
    el.querySelectorAll('[data-field]').forEach(field => {
      if (item[field.dataset.field]) field.value = item[field.dataset.field];
      field.addEventListener('input', debouncedPreview);
    });
  });
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('portfolio_data');
    if (!raw) return;
    const data = JSON.parse(raw);
    const fields = ['fullName','title','about','photo','dob','gender','nationality','drivingLicense',
      'email','phone','address','city','country','postalCode','github','linkedin','twitter','website','interests'];
    fields.forEach(f => setVal(f, data[f]));
    const dynamicKeys = ['experience','education','skills','languages','projects','certifications','awards','volunteering','references'];
    dynamicKeys.forEach(k => loadDynamicItems(k, data[k]));
    if (data._theme) {
      const radio = document.querySelector(`input[name="theme"][value="${data._theme}"]`);
      if (radio) {
        radio.checked = true;
        document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
        radio.closest('.theme-card').classList.add('active');
      }
    }
    showToast('Form restored from last session', 'info');
  } catch {}
}

exportBtn.addEventListener('click', async () => {
  const data = collectFormData();
  if (!data.fullName) {
    showToast('Please enter your name first', 'error');
    currentStep = 0;
    updateStep();
    document.getElementById('fullName').focus();
    return;
  }
  const theme = getTheme();
  exportBtn.textContent = 'Generating PDF...';
  exportBtn.disabled = true;
  try {
    const res = await fetch('/api/preview', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, theme }),
    });
    const result = await res.json();
    if (result.html) {
      const parser = new DOMParser();
      const parsed = parser.parseFromString(result.html, 'text/html');
      let cssText = '';
      parsed.querySelectorAll('style').forEach(s => { cssText += s.textContent; });
      cssText = cssText.replace(/body\s*\{/g, '#pdf-root {');
      cssText += `
        #pdf-root { margin:0!important; padding:0!important; width:794px!important; }
        #pdf-root .portfolio { max-width:none!important; margin:0!important; box-shadow:none!important; width:794px!important; }
        #pdf-root .layout { width:794px!important; }
        #pdf-root .cv-container { max-width:none!important; margin:0!important; box-shadow:none!important; width:794px!important; }
        #pdf-root .content { max-width:none!important; flex:1!important; }
      `;
      const wrapper = document.createElement('div');
      wrapper.id = 'pdf-root';
      wrapper.style.cssText = 'position:absolute;left:-9999px;top:0;width:794px;';
      const styleEl = document.createElement('style');
      styleEl.textContent = cssText;
      wrapper.appendChild(styleEl);
      const inner = document.createElement('div');
      inner.innerHTML = parsed.body.innerHTML;
      wrapper.appendChild(inner);
      document.body.appendChild(wrapper);
      await new Promise(r => setTimeout(r, 600));
      const target = inner.firstElementChild || inner;
      const fileName = data.fullName.replace(/\s+/g, '_') + '_' + theme;
      await html2pdf().set({
        margin: 0,
        filename: `${fileName}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'] },
      }).from(target).save();
      document.body.removeChild(wrapper);
      showToast('PDF downloaded successfully!', 'success');
    }
  } catch {
    showToast('PDF generation failed', 'error');
  }
  exportBtn.textContent = 'Download PDF';
  exportBtn.disabled = false;
});

exportZipBtn.addEventListener('click', async () => {
  const data = collectFormData();
  if (!data.fullName) {
    showToast('Please enter your name first', 'error');
    currentStep = 0;
    updateStep();
    document.getElementById('fullName').focus();
    return;
  }
  const theme = getTheme();
  exportZipBtn.textContent = 'Generating...';
  exportZipBtn.disabled = true;
  try {
    const res = await fetch('/api/export', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data, theme }),
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileName = data.fullName.replace(/\s+/g, '_') + '_' + theme;
    a.download = `${fileName}.zip`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('HTML package downloaded!', 'success');
  } catch {
    showToast('Download failed', 'error');
  }
  exportZipBtn.textContent = 'Download HTML';
  exportZipBtn.disabled = false;
});

resetBtn.addEventListener('click', () => {
  if (!confirm('Are you sure? All form data will be cleared.')) return;
  localStorage.removeItem('portfolio_data');
  document.querySelectorAll('.form-panel input, .form-panel textarea').forEach(el => { el.value = ''; });
  document.querySelectorAll('.form-panel select').forEach(el => { el.selectedIndex = 0; });
  document.querySelectorAll('.dynamic-list').forEach(list => { list.innerHTML = ''; });
  currentStep = 0;
  updateStep();
  updatePreview();
  showToast('Form reset successfully', 'info');
});

loadFromStorage();
updateStep();
updatePreview();
