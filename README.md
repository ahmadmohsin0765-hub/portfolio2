# Personal Portfolio — Ahmad Mohsin

A minimalist, modern, and art-directed personal portfolio website for **Ahmad Mohsin**, a first-year student developer actively building practical software foundations in HTML5, CSS3, and Python.

The website is designed with an editorial aesthetic, refined typography, generous whitespace, and authentic content grounded in actual learning progress.

---

## 🎨 Visual Design System

- **Main Background**: `#F7F7F5` (Warm minimalist off-white)
- **Primary Text**: `#20211F` (Deep charcoal)
- **Secondary Text**: `#70716D` (Muted slate gray)
- **Accent**: `#496B50` (Deep forest sage)
- **Borders & Separators**: `#E3E3DE`
- **Surface**: `#FFFFFF`
- **Typography**: [Geist](https://fonts.google.com/specimen/Geist) and [Inter](https://fonts.google.com/specimen/Inter) paired with [Geist Mono](https://fonts.google.com/specimen/Geist+Mono) for code and metadata.

---

## 📁 Project Structure

```text
portfolio/
├── index.html       # Main semantic HTML5 portfolio document, SEO, and structure
├── style.css        # Vanilla CSS3 styling, design tokens, layout grids, and responsive rules
├── script.js        # Vanilla JavaScript: navigation, repo sync, calendar, and animations
├── assets/
│   └── favicon.svg  # Custom minimalist SVG monogram icon
└── README.md        # Documentation, local development guide, and deployment instructions
```

---

## 🚀 Running the Website Locally

Because this project is built entirely with vanilla web standards (HTML5, CSS3, vanilla JavaScript), it requires **zero build steps, zero node modules, and zero compilation**.

### Option 1: Python Built-in Server (Recommended)
Open your terminal in the `portfolio/` directory and run:

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in any web browser.

### Option 2: Direct File Opening
You can open `index.html` directly in your browser. (Note: Running via a local server like `python3 -m http.server` is recommended to allow the browser's `fetch()` API to make unauthenticated requests to GitHub).

---

## 🛠️ How to Add or Remove Projects

All project data is managed in `script.js` under the `VERIFIED_PROJECTS` array:

```javascript
const VERIFIED_PROJECTS = [
  {
    name: 'Project Name',
    isFeatured: false, // Set to true to highlight in the top large layout
    description: 'Concise, genuine summary of what the project does.',
    technologies: ['HTML5', 'CSS3', 'Python'],
    repoUrl: 'https://github.com/ahmadmohsin0765-hub/your-repo-name',
    demoUrl: null // Set to a working live URL or null if none exists
  },
  // Add additional projects here...
];
```

- **To add a project**: Add a new object to `VERIFIED_PROJECTS` with accurate descriptions and genuine links.
- **To remove a project**: Delete the corresponding object from the array.
- **Dynamic Enhancement**: `script.js` will also attempt to query the public GitHub REST API (`https://api.github.com/users/ahmadmohsin0765-hub/repos`) on page load. If rate limits or network issues occur, the site automatically falls back to `VERIFIED_PROJECTS` with zero interruption to the user experience.

---

## 📊 How the GitHub Contribution Calendar Works

The activity section renders an authentic 52-week contribution heat map reflecting genuine commits on GitHub:

1. **Live Data Fetch**: `script.js` fetches unauthenticated contribution history from `https://github-contributions-api.jogruber.de/v4/ahmadmohsin0765-hub?y=last`.
2. **SVG Vector Rendering**: The response data is parsed into weeks and weekdays, calculating accurate color intensity levels (levels 0 to 4) mapped to the portfolio's custom green palette (`#496B50`).
3. **Interactive Tooltips**: Hovering or focusing on any cell shows the exact date and contribution count.
4. **Resilience & Fallback**: If the external API is offline or rate-limited, the component gracefully renders a verified baseline with a direct link to Ahmad's official GitHub activity page.

### Third-Party Service Limitations
- GitHub's official REST API does not provide full 365-day SVG contribution data without a personal access token.
- To maintain security and avoid exposing private credentials in static client-side JavaScript, the portfolio uses a public CORS-enabled gateway.
- Public gateways may occasionally experience rate limiting or temporary latency. The fallback ensures the UI remains intact regardless.

---

## 🌐 Deploying to GitHub Pages

You can host this website completely free using **GitHub Pages**:

1. Initialize a Git repository in this folder (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit of personal portfolio"
   ```

2. Create a repository named `portfolio` (or `<username>.github.io`) on GitHub:
   ```bash
   git remote add origin https://github.com/ahmadmohsin0765-hub/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select the `main` branch and `/ (root)` folder, then click **Save**.
   - Your website will be live in a couple of minutes at:
     `https://ahmadmohsin0765-hub.github.io/portfolio/`

---

## 👤 Author

**Ahmad Mohsin**  
- GitHub: [@ahmadmohsin0765-hub](https://github.com/ahmadmohsin0765-hub)  
- LinkedIn: [in/ahmad-mohsin-1b88b5416](https://www.linkedin.com/in/ahmad-mohsin-1b88b5416/)
