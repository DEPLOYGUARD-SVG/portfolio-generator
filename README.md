# Portfolio Generator

A web application that generates beautiful portfolio websites from a simple multi-step form. Choose from 3 themes, preview changes in real-time, and export your portfolio as a static HTML+CSS ZIP file.

![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-Template_Engine-B4CA65)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

### Multi-Step Form
6-step form with progress bar and step navigation. Fill in your personal info, experience, skills, projects, education, and contact details. Dynamic lists let you add and remove entries for experience, skills, projects, and education sections.

### 3 Portfolio Themes

| Theme | Style |
|-------|-------|
| **Minimal** | Clean white background, elegant typography, single-column layout |
| **Modern** | Dark theme with purple-blue gradient accents, card-based grid layout |
| **Creative** | Split layout with dark sidebar, timeline design, amber accent colors |

### Live Preview
Real-time preview panel updates as you type with 300ms debounce. Toggle between desktop and mobile viewport to check responsiveness.

### Static HTML Export
Download your complete portfolio as a ZIP file containing `index.html` and `style.css`. Open directly in any browser — no server required. Ready to deploy on GitHub Pages, Netlify, or any static hosting.

### Responsive Design
Both the generator interface and all generated portfolios are fully responsive with mobile-first breakpoints.

## Installation

```bash
git clone https://github.com/ugurcl/portfolio-generator.git
cd portfolio-generator
npm install
npm start
```

Open http://localhost:3000 in your browser.

For development with auto-restart:
```bash
npm run dev
```

## Usage

1. Open http://localhost:3000
2. Fill in each step of the form (Personal, Experience, Skills, Projects, Education, Contact)
3. Use **+ Add** buttons to add multiple entries for experience, skills, projects, and education
4. Select a theme from the theme cards below the form
5. Watch the live preview update on the right panel
6. Toggle **Desktop / Mobile** to check responsiveness
7. Click **Download Portfolio (ZIP)** to export your portfolio
8. Unzip and open `index.html` in any browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Serves the generator page |
| `POST` | `/api/preview` | Renders portfolio HTML for live preview |
| `POST` | `/api/export` | Generates and returns a ZIP file with HTML + CSS |

## Project Structure

```
portfolio-generator/
├── package.json
├── server.js                 # Express server with EJS rendering
├── public/
│   ├── css/
│   │   └── generator.css     # Generator UI styles
│   └── js/
│       └── generator.js      # Form logic, live preview, ZIP export
├── views/
│   ├── index.ejs             # Generator page (form + preview)
│   └── partials/
│       └── head.ejs          # Shared HTML head
├── templates/
│   ├── minimal/              # Clean single-column theme
│   │   ├── index.ejs
│   │   └── style.css
│   ├── modern/               # Dark card-based theme
│   │   ├── index.ejs
│   │   └── style.css
│   └── creative/             # Split layout with sidebar
│       ├── index.ejs
│       └── style.css
├── routes/
│   └── api.js                # Preview and export API endpoints
├── .gitignore
└── README.md
```

## How It Works

### Form Management
The generator uses a multi-step form with dynamic list management. Each step (Personal, Experience, Skills, Projects, Education, Contact) is shown/hidden via CSS classes. Dynamic sections (experience, skills, projects, education) use HTML templates injected via `insertAdjacentHTML` with add/remove functionality.

### Live Preview
Every form input triggers a debounced (300ms) POST request to `/api/preview` with the collected form data and selected theme. The server renders the corresponding EJS template with the data and returns the complete HTML. The response is written directly into the preview iframe using `contentDocument.write()`.

### Template Rendering
Each theme has its own EJS template and CSS file. When `embedded: true` (preview mode), the CSS is inlined via a `<style>` tag. When `embedded: false` (export mode), it uses a `<link>` tag referencing `style.css`.

### ZIP Export
The export endpoint renders the portfolio HTML with `embedded: false`, reads the theme's CSS file, and packages both into a ZIP file using JSZip. The ZIP is sent as a binary response and downloaded via a temporary blob URL on the client side.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Framework | Express |
| Template Engine | EJS |
| ZIP Generation | JSZip |
| Frontend | Vanilla JavaScript + CSS |
| Themes | 3 custom responsive themes |

## License

MIT
