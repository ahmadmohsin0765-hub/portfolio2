/**
 * Ahmad Mohsin — Personal Portfolio
 * Vanilla JavaScript Engine
 * Modern, accessible, modular, and lightweight.
 */

'use strict';

// ============================================================================
// 1. Core State & Curated Project Registry
// ============================================================================
const CONFIG = {
  githubUsername: 'ahmadmohsin0765-hub',
  githubProfileUrl: 'https://github.com/ahmadmohsin0765-hub',
  linkedinProfileUrl: 'https://www.linkedin.com/in/ahmad-mohsin-1b88b5416/',
  reposApiUrl: 'https://api.github.com/users/ahmadmohsin0765-hub/repos?sort=updated&per_page=100',
  contributionsApiUrl: 'https://github-contributions-api.jogruber.de/v4/ahmadmohsin0765-hub?y=last'
};

/**
 * Verified real projects authored and practiced by Ahmad Mohsin.
 * Used as reliable primary/fallback project data.
 */
const VERIFIED_PROJECTS = [
  {
    name: 'Go Green India',
    isFeatured: true,
    tag: 'Featured Project · Environmental Platform',
    description: 'An interactive public-service tokenomics and eco-incentive platform designed around sustainable daily habits, green credit calculations, and community environmental awareness.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    repoUrl: 'https://github.com/ahmadmohsin0765-hub/go-green',
    demoUrl: null, // Honest: demo will only be shown when a public hosted link is active
    metrics: { label: 'Tokenomics Framework', value: '100 GP = ₹1' }
  },
  {
    name: 'Space Exploration Interface',
    isFeatured: false,
    description: 'A responsive space portal exploring mission logs, upcoming launches, and astronomy updates. Features custom orbital typography, semantic tab navigation, and clean CSS layouts.',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    repoUrl: 'https://github.com/ahmadmohsin0765-hub',
    demoUrl: null
  },
  {
    name: 'Google Search Interface Clone',
    isFeatured: false,
    description: 'A desktop recreation of Google\'s signature search homepage. Built from scratch to master CSS centering techniques, responsive input states, button interactions, and SVG icon integration.',
    technologies: ['HTML5', 'CSS3'],
    repoUrl: 'https://github.com/ahmadmohsin0765-hub',
    demoUrl: null
  },
  {
    name: 'Python Fundamentals (albane)',
    isFeatured: false,
    description: 'Practical programming exercises exploring Python syntax, functions, parameter handling, and string formatting as part of my first-year software foundations.',
    technologies: ['Python 3'],
    repoUrl: 'https://github.com/ahmadmohsin0765-hub/albane',
    demoUrl: null
  },
  {
    name: 'Systems & Terminal Practice (nst_practice)',
    isFeatured: false,
    description: 'Hands-on lab repository tracking shell commands, Unix filesystem hierarchies, environment configurations, and version control workflows with Git.',
    technologies: ['Shell', 'Git', 'Linux CLI'],
    repoUrl: 'https://github.com/ahmadmohsin0765-hub/nst_practice',
    demoUrl: null
  }
];

// ============================================================================
// 2. Navigation & Mobile Menu Handler
// ============================================================================
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-link');

  // Sticky navbar shadow/border on scroll
  function handleScroll() {
    if (window.scrollY > 15) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('open');
    });

    // Close mobile menu when clicking outside or on a link
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.focus();
      }
    });
  }

  // Active section indicator (Scrollspy) using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && sections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          links.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }
}

// ============================================================================
// 3. Dynamic Copyright & Date Utilities
// ============================================================================
function initDateUtilities() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

// ============================================================================
// 4. Scroll Reveal Animations
// ============================================================================
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length === 0) return;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('revealed'));
  }
}

// ============================================================================
// 5. Projects Rendering & GitHub Metadata Integration
// ============================================================================
function renderProjects(projects) {
  const featuredContainer = document.getElementById('featured-project-container');
  const gridContainer = document.getElementById('projects-grid-container');

  if (!featuredContainer || !gridContainer) return;

  const featured = projects.find(p => p.isFeatured) || projects[0];
  const regularProjects = projects.filter(p => p !== featured);

  // Render Featured Project
  featuredContainer.innerHTML = `
    <article class="project-card-featured reveal">
      <div class="featured-content">
        <div>
          <span class="featured-tag">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            ${escapeHtml(featured.tag || 'Featured Project')}
          </span>
          <h3 class="project-title">${escapeHtml(featured.name)}</h3>
          <p class="project-desc">${escapeHtml(featured.description)}</p>
          <ul class="project-tech-list" aria-label="Technologies used">
            ${featured.technologies.map(t => `<li class="tech-tag">${escapeHtml(t)}</li>`).join('')}
          </ul>
        </div>
        <div class="project-actions">
          <a href="${escapeHtml(featured.repoUrl)}" class="btn-primary" target="_blank" rel="noopener noreferrer">
            <span>View Source on GitHub</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
          ${featured.demoUrl ? `
            <a href="${escapeHtml(featured.demoUrl)}" class="btn-secondary" target="_blank" rel="noopener noreferrer">
              <span>Live Demonstration</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          ` : ''}
        </div>
      </div>
      <div class="featured-preview" aria-hidden="true">
        <div class="preview-mockup">
          <div class="mockup-header">
            <span class="mockup-dot"></span>
            <span class="mockup-dot"></span>
            <span class="mockup-dot"></span>
          </div>
          <div class="mockup-body">
            <span class="mockup-badge">National Registry Model</span>
            <div class="mockup-title">🌱 Sustainable Tokenomics System</div>
            <p style="font-size: 0.85rem; color: #70716D;">Direct conversion model for personal eco-actions into verifiable green rewards.</p>
            ${featured.metrics ? `
              <div class="mockup-metric">
                <span class="metric-num">${escapeHtml(featured.metrics.value)}</span>
                <span class="metric-label">${escapeHtml(featured.metrics.label)}</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </article>
  `;

  // Render Regular Projects Grid
  gridContainer.innerHTML = regularProjects.map(proj => `
    <article class="project-card reveal">
      <div>
        <div class="project-card-header">
          <h3 class="project-card-title">${escapeHtml(proj.name)}</h3>
        </div>
        <p class="project-card-desc">${escapeHtml(proj.description)}</p>
      </div>
      <div>
        <ul class="project-tech-list" aria-label="Technologies used">
          ${proj.technologies.map(t => `<li class="tech-tag">${escapeHtml(t)}</li>`).join('')}
        </ul>
        <div class="project-card-footer">
          <a href="${escapeHtml(proj.repoUrl)}" class="project-link" target="_blank" rel="noopener noreferrer">
            <span>Repository</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
          </a>
          ${proj.demoUrl ? `
            <a href="${escapeHtml(proj.demoUrl)}" class="project-link" target="_blank" rel="noopener noreferrer">
              <span>Demo</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </a>
          ` : ''}
        </div>
      </div>
    </article>
  `).join('');

  // Re-observe newly injected reveal elements
  initScrollReveals();
}

/**
 * Fetch public repositories from GitHub REST API
 * Handles rate limits (403), network outages, and gracefully enriches data.
 */
async function loadGitHubProjects() {
  const statusEl = document.getElementById('repo-sync-status');
  
  // Render immediately with verified data so the page is instant and reliable
  renderProjects(VERIFIED_PROJECTS);

  try {
    const response = await fetch(CONFIG.reposApiUrl);
    if (!response.ok) {
      if (response.status === 403) {
        if (statusEl) statusEl.textContent = 'Curated registry loaded (GitHub rate limit reached)';
      } else {
        if (statusEl) statusEl.textContent = 'Curated project registry loaded';
      }
      return;
    }

    const repos = await response.json();
    if (Array.isArray(repos) && repos.length > 0) {
      // Find extra notable non-fork repos with meaningful content
      const additionalRepos = repos
        .filter(r => !r.fork && !['hello-word', 'hi', 'demo', 'khfsg'].includes(r.name.toLowerCase()))
        .map(r => ({
          name: formatRepoName(r.name),
          isFeatured: false,
          description: r.description || `Practical code repository exploring ${r.language || 'development fundamentals'} and version control.`,
          technologies: r.language ? [r.language] : ['Code'],
          repoUrl: r.html_url,
          demoUrl: r.homepage || null
        }));

      // Merge verified projects with newly found repos if any exist and aren't already included
      const merged = [...VERIFIED_PROJECTS];
      additionalRepos.forEach(repo => {
        const alreadyExists = merged.some(p => p.name.toLowerCase() === repo.name.toLowerCase());
        if (!alreadyExists) {
          merged.push(repo);
        }
      });

      renderProjects(merged);
      if (statusEl) statusEl.textContent = `Synchronized with GitHub (${repos.length} public repos)`;
    }
  } catch (err) {
    // Fail quietly and gracefully preserve verified project cards
    if (statusEl) statusEl.textContent = 'Curated project registry active';
  }
}

// ============================================================================
// 6. GitHub Contribution Calendar (52-Week Activity Graph)
// ============================================================================
async function initContributionCalendar() {
  const container = document.getElementById('calendar-graph-container');
  const countEl = document.getElementById('annual-contributions-count');
  const tooltip = document.getElementById('calendar-tooltip');

  if (!container) return;

  try {
    const response = await fetch(CONFIG.contributionsApiUrl);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    if (!data || !Array.isArray(data.contributions)) {
      throw new Error('Invalid contribution data format');
    }

    // Update total count
    const totalCount = data.total && typeof data.total.lastYear === 'number'
      ? data.total.lastYear
      : data.contributions.reduce((sum, item) => sum + (item.count || 0), 0);

    if (countEl) {
      countEl.textContent = String(totalCount);
    }

    // Render the SVG calendar grid
    renderCalendarSvg(container, data.contributions, tooltip);
  } catch (error) {
    // Graceful fallback with genuine stats and link to GitHub profile
    renderCalendarFallback(container, countEl);
  }
}

/**
 * Builds an authentic, responsive 52-week SVG grid
 */
function renderCalendarSvg(container, days, tooltip) {
  // Sort days chronologically
  days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Split into weeks of 7 days (Sunday = 0 to Saturday = 6)
  const weeks = [];
  let currentWeek = [];

  // Align start to the weekday of first contribution
  const firstDate = new Date(days[0].date);
  const firstDayOfWeek = firstDate.getDay();

  // Add empty filler days before start if necessary
  for (let i = 0; i < firstDayOfWeek; i++) {
    currentWeek.push(null);
  }

  days.forEach(day => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }
    weeks.push(currentWeek);
  }

  // Calculate layout dimensions
  const cellSize = 11;
  const cellGap = 3;
  const leftPadding = 32;
  const topPadding = 24;
  const totalWeeks = weeks.length;
  const width = leftPadding + (totalWeeks * (cellSize + cellGap)) + 10;
  const height = topPadding + (7 * (cellSize + cellGap)) + 10;

  // Month labels calculation
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthHeaders = [];
  let lastMonth = -1;

  weeks.forEach((week, wIndex) => {
    const firstValidDay = week.find(d => d !== null);
    if (firstValidDay) {
      const monthIndex = new Date(firstValidDay.date).getMonth();
      if (monthIndex !== lastMonth && wIndex < totalWeeks - 1) {
        monthHeaders.push({
          name: months[monthIndex],
          x: leftPadding + (wIndex * (cellSize + cellGap))
        });
        lastMonth = monthIndex;
      }
    }
  });

  // Color mapping based on visual design system (accent #496B50)
  const levelColors = {
    0: '#EFEFEA',
    1: '#C8DDC9',
    2: '#8EBA93',
    3: '#496B50',
    4: '#2D4833'
  };

  // Build SVG XML
  let svg = `
    <svg viewBox="0 0 ${width} ${height}" class="calendar-table-container" role="img" aria-label="Ahmad Mohsin's GitHub contributions graph over the past 12 months">
      <!-- Weekday labels -->
      <text x="8" y="${topPadding + (1 * (cellSize + cellGap)) + 9}" font-family="var(--font-mono)" font-size="9" fill="#70716D">Mon</text>
      <text x="8" y="${topPadding + (3 * (cellSize + cellGap)) + 9}" font-family="var(--font-mono)" font-size="9" fill="#70716D">Wed</text>
      <text x="8" y="${topPadding + (5 * (cellSize + cellGap)) + 9}" font-family="var(--font-mono)" font-size="9" fill="#70716D">Fri</text>
      
      <!-- Month headers -->
      ${monthHeaders.map(m => `
        <text x="${m.x}" y="14" font-family="var(--font-mono)" font-size="9" fill="#70716D">${m.name}</text>
      `).join('')}
      
      <!-- Calendar Grid Cells -->
      <g>
  `;

  weeks.forEach((week, wIndex) => {
    const x = leftPadding + (wIndex * (cellSize + cellGap));
    week.forEach((day, dIndex) => {
      if (day === null) return;
      const y = topPadding + (dIndex * (cellSize + cellGap));
      const fill = levelColors[day.level] || levelColors[0];
      const stroke = day.level === 0 ? 'stroke="#E3E3DE" stroke-width="0.8"' : '';
      const formattedDate = formatDate(day.date);
      const ariaLabel = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${formattedDate}`;

      svg += `
        <rect 
          class="calendar-day" 
          x="${x}" 
          y="${y}" 
          width="${cellSize}" 
          height="${cellSize}" 
          rx="2" 
          fill="${fill}" 
          ${stroke}
          tabindex="0"
          role="gridcell"
          aria-label="${ariaLabel}"
          data-date="${formattedDate}"
          data-count="${day.count}"
        />
      `;
    });
  });

  svg += `
      </g>
    </svg>
  `;

  container.innerHTML = svg;

  // Setup accessible interactive tooltips
  setupTooltipInteractions(container, tooltip);
}

function setupTooltipInteractions(container, tooltip) {
  if (!tooltip) return;

  const cells = container.querySelectorAll('.calendar-day');
  cells.forEach(cell => {
    function show(e) {
      const date = cell.getAttribute('data-date');
      const count = cell.getAttribute('data-count');
      const countText = count === '1' ? '1 contribution' : `${count} contributions`;
      tooltip.textContent = `${countText} on ${date}`;

      const rect = cell.getBoundingClientRect();
      const parentRect = container.getBoundingClientRect();
      const left = rect.left - parentRect.left + (rect.width / 2);
      const top = rect.top - parentRect.top;

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
      tooltip.classList.add('visible');
    }

    function hide() {
      tooltip.classList.remove('visible');
    }

    cell.addEventListener('mouseenter', show);
    cell.addEventListener('mouseleave', hide);
    cell.addEventListener('focus', show);
    cell.addEventListener('blur', hide);
  });
}

function renderCalendarFallback(container, countEl) {
  if (countEl) countEl.textContent = '30+';
  container.innerHTML = `
    <div class="activity-fallback">
      <p>Ahmad actively commits learning exercises, terminal logs, and web projects directly on GitHub.</p>
      <a href="${CONFIG.githubProfileUrl}" class="btn-outline" target="_blank" rel="noopener noreferrer">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        <span>View Full Contribution Graph on GitHub ↗</span>
      </a>
    </div>
  `;
}

// ============================================================================
// 7. Helpers & Security Sanitization
// ============================================================================
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatRepoName(name) {
  if (!name) return '';
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
}

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateStr).toLocaleDateString('en-US', options);
}

// ============================================================================
// 8. Bootstrap Application on DOM Ready
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initDateUtilities();
  initScrollReveals();
  loadGitHubProjects();
  initContributionCalendar();
});
