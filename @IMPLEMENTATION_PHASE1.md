# @IMPLEMENTATION_PHASE1: Project Setup & Scaffolding

**Phase Title**: Project Setup & Scaffolding  
**Phase Number**: 1 of 9  
**Status**: Ready for Implementation  
**Last Updated**: 2024-04-21

---

## Executive Summary

Phase 1 establishes a clean, runnable development environment with minimal boilerplate. By the end of this phase, the project must:
- Have a valid `package.json` with ES6 module support (`type: "module"`)
- Render a 16×16 grid layout in the browser (no logic, pure HTML/CSS)
- Support `npm start` (local development server), `npm test` (test runner), and `npm run build` (bundler/minifier, if used)
- Have zero console errors on initial load
- Include proper `.gitignore` and `README.md` documentation

**Success criteria**: A developer can clone the repo, run `npm start`, and see a responsive 16×16 grid without any errors.

---

## 1. Architectural Design

### 1.1 Project Structure

```
pxl-sweeper-MaartenSmetsPXL/
├── index.html                 # Entry point HTML
├── package.json              # Project metadata and scripts
├── package-lock.json         # Dependency lock (auto-generated)
├── .gitignore                # VCS ignore rules
├── README.md                 # User-facing documentation
├── DEVELOPER.md              # (Phase 9) Architecture guide
├── src/
│   ├── index.js             # Main entry point
│   ├── style.css            # Global styles
│   └── (TBD)                # Future logic modules (Phase 2+)
├── test/
│   └── (TBD)                # Unit/integration tests (Phase 2+)
├── dist/                     # (Optional) Build output directory
└── node_modules/            # (Auto-generated, in .gitignore)
```

### 1.2 package.json Structure

```json
{
  "name": "pxl-sweeper",
  "version": "1.0.0",
  "description": "A minimalist, single-page Minesweeper game",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "start": "...",        // HTTP server or dev server
    "test": "...",         // Test runner command
    "build": "..."         // Bundler or minifier (optional MVP)
  },
  "keywords": ["minesweeper", "game", "web"],
  "author": "",
  "license": "MIT",
  "devDependencies": {}    // (Will populate if test runner needed)
}
```

### 1.3 HTML5 Document Structure

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="PXL Sweeper: Minimalist Minesweeper Game" />
    <title>PXL Sweeper</title>
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <div id="app">
      <!-- Game container (populated by JS) -->
      <header id="header">
        <h1>PXL Sweeper</h1>
        <div id="stats">
          Mines: <span id="mine-counter">40</span>
        </div>
        <button id="restart-btn">Restart</button>  <!-- Phase 7 -->
      </header>
      <main id="game-container">
        <div id="grid"></div>  <!-- 16×16 grid populated by JS -->
      </main>
    </div>
    <script type="module" src="src/index.js"></script>
  </body>
</html>
```

### 1.4 CSS Grid Layout (Basic)

```css
/* Phase 1: Scaffolding only, no game logic styling */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-width: 100%;
  width: 100%;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.5rem;
}

#stats {
  flex: 1;
}

#restart-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  cursor: pointer;
  background-color: #fff;
}

#game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 100vw;
  max-height: 100vh;
}

#grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
  gap: 1px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  padding: 1rem;
  background-color: #e0e0e0;
  border-radius: 0.5rem;
}

.tile {
  background-color: #c0c0c0;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  cursor: pointer;
  user-select: none;
}
```

### 1.5 index.js Entry Point (Phase 1 Scaffolding)

```javascript
/**
 * PXL Sweeper - Entry Point
 * Phase 1: Initialize DOM with 16×16 grid placeholder
 * 
 * No game logic runs in Phase 1; this is purely DOM initialization.
 */

function initializeGrid() {
  const gridContainer = document.getElementById('grid');
  
  // Create 256 empty tiles (16×16)
  for (let i = 0; i < 256; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    gridContainer.appendChild(tile);
  }
  
  console.log('✓ Grid initialized: 16×16 (256 tiles)');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initializeGrid();
  console.log('✓ PXL Sweeper Phase 1: Ready');
});
```

---

## 2. File-Level Strategy

| File | Responsibility | New/Update | Lines |
|------|-----------------|-----------|-------|
| `package.json` | Project metadata, npm scripts | New | ~20 |
| `index.html` | HTML5 entry point with grid container | New | ~40 |
| `src/index.js` | DOM initialization and grid rendering | New | ~30 |
| `src/style.css` | Global reset, layout, grid styling | New | ~100 |
| `.gitignore` | VCS exclusions (node_modules, dist, OS files) | New | ~15 |
| `README.md` | Setup instructions, project overview | New | ~60 |

**Total Phase 1 Production Code**: ~145 lines (excludes comments and blank lines)

### 2.1 Operational Roles

- **package.json**: Defines project identity and npm scripts. Enables `npm install`, `npm start`, `npm test`, `npm run build`.
- **index.html**: Single HTML document loaded by browser. Must include viewport meta and script tag with ES6 module type.
- **src/index.js**: First JavaScript file executed. Responsible for DOM initialization and grid rendering.
- **src/style.css**: All visual styling. Must establish baseline layout, grid dimensions, and tile appearance.
- **.gitignore**: Prevents accidental commits of build artifacts and dependencies. Critical for repository hygiene.
- **README.md**: Onboarding documentation. Must explain clone, install, start, test sequence.

---

## 3. Atomic Execution Steps

### 3.1 Create package.json

**Plan**: Define project metadata with ES6 module support and three npm scripts.

**Act**:
```json
{
  "name": "pxl-sweeper",
  "version": "1.0.0",
  "description": "A minimalist, single-page Minesweeper game",
  "type": "module",
  "main": "src/index.js",
  "scripts": {
    "start": "npx serve -l 3000",
    "test": "node --test test/**/*.test.js",
    "build": "mkdir -p dist && cp index.html dist/ && cp -r src dist/"
  },
  "keywords": ["minesweeper", "game", "web", "pxl"],
  "author": "Maarten Smets",
  "license": "MIT",
  "devDependencies": {}
}
```

**Rationale**:
- `"type": "module"` enables ES6 import/export syntax globally in the project.
- `"start"` uses `npx serve`, a zero-config HTTP server; no setup required.
- `"test"` uses Node's built-in test runner (Node 18+); no external dependency needed for Phase 1.
- `"build"` is a simple copy script (no transpilation needed for MVP); can be upgraded to Vite/Webpack later.

**Validate**:
- File created at repository root
- JSON is valid (no syntax errors)
- `"type": "module"` is present
- All three scripts exist

---

### 3.2 Create index.html

**Plan**: Minimal HTML5 document with viewport meta, script tag, and grid container.

**Act**:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="PXL Sweeper: Minimalist Minesweeper Game" />
    <title>PXL Sweeper</title>
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <div id="app">
      <header id="header">
        <h1>PXL Sweeper</h1>
        <div id="stats">
          Mines: <span id="mine-counter">40</span>
        </div>
        <button id="restart-btn" style="display: none;">Restart</button>
      </header>
      <main id="game-container">
        <div id="grid"></div>
      </main>
    </div>
    <script type="module" src="src/index.js"></script>
  </body>
</html>
```

**Rationale**:
- Viewport meta ensures responsive scaling on mobile.
- `<script type="module">` enables ES6 imports; placed before closing `</body>` for optimal load order.
- `id="grid"` targets the container where JS will inject tiles.
- Header elements are present but restart button is hidden (Phase 7) to avoid broken functionality.
- CSS link uses relative path `src/style.css` (works from root directory).

**Validate**:
- File created at repository root (`index.html`)
- Valid HTML5 structure (DOCTYPE, lang attribute, meta tags)
- CSS and JS paths are relative and correct
- No 404 errors when loaded in browser

---

### 3.3 Create src/index.js

**Plan**: Initialize 16×16 grid by creating 256 DOM tiles and log success.

**Act**:
```javascript
/**
 * PXL Sweeper - Entry Point
 * Phase 1: Initialize DOM with 16×16 grid placeholder
 * 
 * Responsibility: Create grid tiles and validate DOM is ready.
 * No game logic in Phase 1; purely DOM initialization.
 */

function initializeGrid() {
  const gridContainer = document.getElementById('grid');
  
  if (!gridContainer) {
    console.error('Grid container not found');
    return;
  }
  
  // Create 256 empty tiles (16 × 16)
  for (let i = 0; i < 256; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    tile.textContent = ''; // Empty for Phase 1
    gridContainer.appendChild(tile);
  }
  
  console.log('✓ Grid initialized: 16×16 (256 tiles)');
}

/**
 * Main initialization routine
 * Waits for DOM to be fully parsed before running.
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeGrid();
  console.log('✓ PXL Sweeper Phase 1: Development Environment Ready');
});
```

**Rationale**:
- Waits for `DOMContentLoaded` to ensure DOM is parsed before tile creation.
- Creates exactly 256 tiles (16×16 = 256).
- Each tile has a `.tile` class for CSS targeting and a `data-index` for future identification.
- Console logs for debugging; confirms grid initialization succeeded.
- No game logic or event listeners in Phase 1.

**Validate**:
- File created at `src/index.js`
- No import/export statements (pure JavaScript for MVP)
- Grid container is queried safely (null check)
- 256 tiles are created and appended
- Console logs appear on page load
- No console errors

---

### 3.4 Create src/style.css

**Plan**: Establish global reset, page layout, and 16×16 grid styling. Tiles must remain square.

**Act**:
```css
/**
 * PXL Sweeper - Global Styles
 * Phase 1: Reset, layout, and grid scaffolding
 * 
 * Key principles:
 * - Tiles are always square (maintained via aspect-ratio or CSS Grid)
 * - Grid fills available space without scrolling (on modern viewports)
 * - Neutral color scheme; no game state styling in Phase 1
 */

/* ===== Global Reset ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0.5rem;
}

/* ===== App Container ===== */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 100vmin;  /* Constrain to viewport's smaller dimension */
  height: 100%;
}

/* ===== Header ===== */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

h1 {
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 600;
  margin: 0;
}

#stats {
  font-size: clamp(0.9rem, 2vw, 1rem);
  font-weight: 500;
}

#restart-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s ease;
}

#restart-btn:hover {
  background-color: #f0f0f0;
}

#restart-btn[style*="display: none"] {
  display: none !important;
}

/* ===== Game Container ===== */
#game-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  max-height: calc(100vh - 150px);  /* Account for header */
}

/* ===== Grid ===== */
#grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
  gap: 1px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;  /* Maintain square grid */
  padding: 0.5rem;
  background-color: #ddd;
  border-radius: 0.25rem;
}

/* ===== Tile (Neutral Phase 1 State) ===== */
.tile {
  background-color: #c0c0c0;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.6rem, 2.5vw, 1rem);
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;
}

.tile:hover {
  background-color: #d0d0d0;
}

.tile:active {
  background-color: #b0b0b0;
}

/* ===== Responsive Adjustments ===== */
@media (max-width: 480px) {
  header {
    flex-direction: column;
    gap: 0.5rem;
  }

  h1 {
    text-align: center;
  }

  #stats {
    text-align: center;
  }

  #restart-btn {
    width: 100%;
  }

  #game-container {
    max-height: calc(100vh - 200px);
  }
}
```

**Rationale**:
- `aspect-ratio: 1 / 1` on `#grid` ensures tiles remain square regardless of viewport.
- `clamp()` for responsive font sizing (scales with viewport).
- `max-width: 100vmin` constrains app to smaller viewport dimension (prevents horizontal scrolling on wide screens).
- Grid gap of `1px` provides visual separation without affecting tile count math.
- Neutral tile color (#c0c0c0) is a gray, similar to classic Minesweeper; usable placeholder for Phase 1.
- Hover and active states preview interactivity (no game logic attached yet).

**Validate**:
- File created at `src/style.css`
- 16×16 grid is rendered with exactly 256 tiles
- All tiles are square (visually)
- No horizontal or vertical scrolling on standard viewports (e.g., 1024px, 768px, 375px)
- Header and grid fit within viewport
- Responsive adjustments apply on mobile (<480px)

---

### 3.5 Create .gitignore

**Plan**: Exclude development artifacts and OS-generated files.

**Act**:
```gitignore
# Dependencies
node_modules/
package-lock.json

# Build output
dist/
build/
*.bundle.js

# Environment and OS
.env
.env.local
.DS_Store
Thumbs.db
*.swp
*.swo
*~
.vscode/settings.json

# IDE
.idea/
*.sublime-workspace
*.sublime-project

# Logs
*.log
npm-debug.log*

# Temporary files
.tmp/
tmp/
temp/
```

**Rationale**:
- `node_modules/` excluded to reduce repository size; installed via `npm install`.
- `dist/` excluded (build output, regenerated on each build).
- `.env` excluded to prevent accidental credential commits.
- `.DS_Store` and `Thumbs.db` prevent OS artifacts from polluting repository.
- IDE-specific files excluded (each developer's setup may vary).

**Validate**:
- File created at repository root (`.gitignore`)
- Git status shows node_modules are ignored (test: `npm install` then `git status`)

---

### 3.6 Create README.md

**Plan**: Document setup, usage, and project overview for onboarding.

**Act**:
```markdown
# PXL Sweeper

A minimalist, single-page web-based Minesweeper game built with plain HTML, CSS, and JavaScript.

## Features

- **Classic Minesweeper gameplay**: 16×16 grid, 40 randomly placed mines
- **First-click safety**: Initial click never reveals a mine
- **Recursive reveal**: Click a zero-adjacent-mines tile to auto-reveal connected regions
- **Flagging**: Right-click to mark suspected mines
- **Responsive design**: Fully playable on desktop, tablet, and mobile
- **Keyboard support**: Arrow keys, Enter/Space to reveal, F to flag
- **Touch support**: Tap to reveal, long-press to flag (mobile)
- **Instant feedback**: <16ms response time target

## Quick Start

### Prerequisites

- Node.js 14+ (or any modern browser to open `index.html` directly)
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd pxl-sweeper-MaartenSmetsPXL

# Install dependencies (minimal for MVP)
npm install
```

### Running the Game

```bash
# Start development server
npm start

# Open your browser and navigate to http://localhost:3000
```

The game will automatically reload if you update files (if using a file watcher).

### Running Tests

```bash
npm test
```

Tests validate game logic, grid state, and tile interactions.

### Building for Production

```bash
npm run build
```

Build output is saved to `dist/` for static hosting (GitHub Pages, Netlify, etc.).

## How to Play

### Objective

Reveal all non-mine tiles without clicking a mine. Win when all 216 safe tiles are revealed.

### Controls

**Desktop:**
- **Left-click**: Reveal a tile
- **Right-click**: Flag/unflag a suspected mine
- **Arrow keys**: Navigate cursor
- **Enter/Space**: Reveal cursor tile
- **F key**: Flag/unflag cursor tile

**Mobile:**
- **Tap**: Reveal a tile
- **Long-press** (hold >0.5s): Flag/unflag a tile

### Game Rules

1. Grid: 16×16 (256 tiles total), 40 mines randomly placed
2. First click is always safe (no mine)
3. Numbers show adjacent mine count (0–8)
4. Click a zero-adjacent tile to auto-reveal connected region
5. Flag tiles to mark suspected mines
6. Win by revealing all non-mine tiles
7. Lose by revealing a mine
8. Click "Restart" at any time for a new game

## Project Structure

```
pxl-sweeper-MaartenSmetsPXL/
├── index.html              # Main HTML entry point
├── package.json            # Project metadata and scripts
├── .gitignore              # VCS ignore rules
├── README.md               # This file
├── DEVELOPER.md            # Architecture guide (Phase 9)
├── src/
│   ├── index.js           # DOM initialization
│   ├── style.css          # Global styles
│   ├── Grid.js            # Grid data model (Phase 2)
│   ├── Tile.js            # Tile state (Phase 2)
│   ├── GameState.js       # Game state tracking (Phase 2)
│   ├── GameLogic.js       # Game logic (Phase 3+)
│   └── Renderer.js        # DOM updates (Phase 3+)
├── test/
│   ├── Grid.test.js       # Grid logic tests
│   ├── Tile.test.js       # Tile state tests
│   ├── GameLogic.test.js  # Game logic tests
│   └── ...                # Additional tests
└── dist/                  # Build output (generated, .gitignored)
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Internet Explorer is not supported.

## Performance

- Grid rendering: <50ms
- Mine placement: <10ms per game
- Recursive reveal: <100ms for typical boards
- UI response: <16ms target

## Accessibility

- WCAG AA color contrast compliance
- Full keyboard navigation support
- Focus indicators on all interactive elements
- Semantic HTML5 markup

## Deployment

### GitHub Pages

```bash
npm run build
git add dist/
git commit -m "Build for production"
git push origin main
```

Then enable GitHub Pages in repository settings, selecting `dist/` as the source.

### Netlify

```bash
npm run build
# Connect repository to Netlify; it will auto-detect package.json and build settings.
```

### Static Host (Vercel, etc.)

Upload `dist/` contents to your hosting provider.

## Development

### Code Style

- ES6 modules and standard JavaScript (no transpilation required)
- VanillaJS, no frameworks (lightweight and dependency-free)
- Comments explain "why", not "what" (code is self-documenting)
- Functional composition over heavy OOP

### Testing Philosophy

- Unit tests validate game logic (Grid, Tile, GameLogic)
- Integration tests validate end-to-end workflows
- Manual tests on real devices (desktop and mobile)
- No snapshot tests; focus on behavioral verification

### Phases

The project is implemented in 9 sequential phases:

1. **Phase 1**: Project setup (HTML, CSS, npm scripts) ← **You are here**
2. **Phase 2**: Grid data model (Tile, Grid, mine placement)
3. **Phase 3**: Tile reveal logic (single-click interaction)
4. **Phase 4**: Recursive reveal (flood-fill algorithm)
5. **Phase 5**: Flagging and mine counter
6. **Phase 6**: Win/loss conditions
7. **Phase 7**: Restart and game reset
8. **Phase 8**: Input handling (keyboard, touch)
9. **Phase 9**: Responsive design and accessibility polish

Each phase builds on previous work and is independently reviewable.

## License

MIT

## Author

Maarten Smets (PXL)

---

**Last Updated**: 2024-04-21
```

**Rationale**:
- Quick Start section guides developers through clone → install → run.
- Gameplay section explains rules and controls for end-users.
- Project Structure shows file organization; helps developers navigate codebase.
- Browser Support sets expectations (modern browsers only).
- Performance and Accessibility note project's key non-functional requirements.
- Phases section documents the implementation roadmap (links to detailed plan in @IMPLEMENTATION_PLAN.md).

**Validate**:
- File created at repository root (`README.md`)
- Markdown is valid (no syntax errors)
- Instructions are clear and accurate
- Code blocks are properly formatted

---

## 4. Edge Cases & Boundary Audit

### 4.1 Critical Failure Modes (Phase 1)

| Failure Mode | Symptom | Mitigation |
|---|---|---|
| `package.json` missing `"type": "module"` | Import statements fail; `SyntaxError: Cannot use import statement` | Always include `"type": "module"` in package.json |
| Relative paths in HTML/CSS incorrect | 404 errors on CSS or JS; blank page | Verify paths relative to repository root; use `index.html` at root, `src/` subdirectory |
| Script tag not `type="module"` | JS doesn't load or errors; mixed module/non-module syntax fails | Always use `<script type="module" src="..."></script>` |
| Grid container ID not `id="grid"` | JS queries fail; 256 tiles never created | Ensure HTML has `<div id="grid"></div>` and JS queries `getElementById('grid')` |
| CSS `aspect-ratio` unsupported (old browser) | Grid is not square (rectangular instead) | Use modern browsers (Chrome 88+, Firefox 87+, Safari 14.1+); provide fallback `width: 100%; height: 100%;` if needed |
| npm scripts use incorrect syntax | `npm start` fails; test runner doesn't work | Test each script manually; use `npx` prefix for commands not installed globally |

### 4.2 Boundary Conditions

| Boundary | Condition | Expected Behavior |
|---|---|---|
| Minimum viewport | 320px (mobile portrait) | Grid still renders square; text readable; no horizontal scroll |
| Maximum viewport | 1440px+ (large desktop) | Grid scales proportionally; max-width constraint prevents overgrowth |
| Tile count | Must be 256 (16×16) | Loop creates exactly 256 divs; no off-by-one errors |
| Grid gap | 1px visual separator | Doesn't affect tile count math; purely visual |
| Asset paths | CSS and JS loaded from relative paths | Work from any directory (relative to `index.html`) |
| DOMContentLoaded timing | JS runs before all images load (if any) | Grid appears immediately; no race conditions |

### 4.3 Architectural Risks (Phase 1)

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| npm ecosystem bloat (too many dev dependencies) | Low | Slower install, larger node_modules | No external dependencies needed for Phase 1; avoid adding until Phase 2 requires testing framework |
| CSS Grid browser compatibility | Low (modern browsers only) | Grid doesn't render in old browsers | No support for IE11; acceptable per assumptions |
| Hard-coded color values | Medium | Design changes require bulk find/replace | Acceptable for MVP; refactor to CSS variables in Phase 9 if needed |
| JS file grows too large | Low (Phase 1 is tiny) | Harder to maintain | Modular design enforced in Phase 2 (separate Grid.js, Tile.js, etc.) |

---

## 5. Verification Protocol

### 5.1 Pre-Implementation Checklist

- [ ] Git repository is initialized and clean
- [ ] Node.js 14+ is installed (`node --version`)
- [ ] npm is available (`npm --version`)
- [ ] No conflicting files (e.g., no existing `package.json`, `index.html`)
- [ ] Repository has write permissions

### 5.2 Implementation Checklist (During Coding)

- [ ] `package.json` created with valid JSON syntax
- [ ] `"type": "module"` is present in package.json
- [ ] `npm start`, `npm test`, `npm run build` scripts are defined
- [ ] `index.html` created at repository root with valid HTML5
- [ ] Viewport meta tag present: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
- [ ] Script tag uses module type: `<script type="module" src="src/index.js"></script>`
- [ ] `src/index.js` created and exports no ES6 modules (Phase 1 is JS only)
- [ ] `src/style.css` created with grid styling
- [ ] `.gitignore` created with node_modules and dist/
- [ ] `README.md` created with setup and gameplay instructions

### 5.3 Automated Test Sequence

#### Test 1: Package.json Validation
```bash
# Command
npm install

# Expected output
✓ No errors
✓ node_modules/ created (or already exists)
✓ package-lock.json generated or verified

# Failure mode
✗ If npm install fails: check JSON syntax, verify Node.js version
```

#### Test 2: npm start (HTTP Server)
```bash
# Command
npm start &
sleep 2  # Wait for server to start
curl -s http://localhost:3000 | grep -q "16×16\|grid\|PXL"
kill %1  # Stop server

# Expected output
✓ Server starts on port 3000
✓ HTTP 200 response
✓ HTML contains "grid" or related content

# Failure mode
✗ If port 3000 in use: change port in package.json
✗ If HTML not served: verify index.html path and serve command
```

#### Test 3: DOM Inspection
```bash
# Command
# Open browser and navigate to http://localhost:3000
# Open DevTools (F12)

# Expected output in browser console
✓ No console errors (red X icons)
✓ Console shows "✓ Grid initialized: 16×16 (256 tiles)"
✓ Console shows "✓ PXL Sweeper Phase 1: Development Environment Ready"

# Inspect DOM
# Right-click > Inspect Element on a tile
✓ 256 `<div class="tile">` elements exist
✓ Each tile has `data-index` attribute (0–255)
✓ Grid container is `<div id="grid">`
```

#### Test 4: npm test (Test Runner)
```bash
# Command
npm test

# Expected output
✓ Test runner starts (Node's built-in test runner or jest/vitest if installed)
✓ No test files fail (may be empty in Phase 1)
✓ Exit code 0

# Failure mode
✗ If no test files exist: skip for Phase 1 (tests start in Phase 2)
```

#### Test 5: npm run build (Build Output)
```bash
# Command
npm run build

# Expected output
✓ dist/ directory created
✓ dist/index.html exists (copied from root)
✓ dist/src/ directory exists (copied from root)
✓ dist/src/style.css exists
✓ dist/src/index.js exists

# Verification
# Open dist/index.html in browser
✓ Game renders identically to root index.html
✓ No 404 errors
```

### 5.4 Manual Verification Sequence

#### Verification 1: Visual Appearance
```
Expected:
- 16×16 grid of tiles, all equal size
- Header with "PXL Sweeper" title, "Mines: 40", and "Restart" button
- No horizontal or vertical scrolling on 1024px viewport
- Tiles are square (not rectangular)
- Neutral gray color (#c0c0c0 or similar)
```

#### Verification 2: Responsive Scaling
```
Test on multiple viewport sizes:
- 320px (mobile portrait): Grid scales down; no scroll; text readable
- 768px (tablet): Grid centered; header above
- 1024px (desktop): Grid fills available space; max-width constraint active
- 1440px (large desktop): Grid does not over-expand; maintains proportions

Expected:
- Grid always fills available space (up to a reasonable max)
- Tiles always remain square
- No horizontal scroll at any size
- No text overflow or clipping
```

#### Verification 3: Browser Console
```
Open DevTools (F12 or Cmd+Option+I)
Check Console tab for:
- ✓ No red errors
- ✓ No orange warnings
- ✓ Info messages show:
  "✓ Grid initialized: 16×16 (256 tiles)"
  "✓ PXL Sweeper Phase 1: Development Environment Ready"

Expected:
- Clean console on first load
- All tiles render without errors
```

#### Verification 4: Network Tab
```
Open DevTools > Network tab
Reload page

Expected:
- index.html: 200 OK
- style.css: 200 OK
- index.js: 200 OK
- No 404 errors
- Total load time <500ms (on local server)
```

#### Verification 5: Keyboard Navigation (Preview for Phase 8)
```
Open the game in browser
Try clicking on tiles (no game logic yet, so nothing happens)
Try pressing Tab to navigate to Restart button
Expected:
- Tiles are clickable (cursor changes to pointer)
- Restart button is focusable
- Focus outline visible when button is focused

Note: No game behavior occurs in Phase 1; this is just verifying interactivity.
```

#### Verification 6: Mobile Emulation (DevTools)
```
Open DevTools
Toggle Device Toolbar (Ctrl+Shift+M or Cmd+Shift+M)
Select mobile device preset (iPhone 12, Pixel 5, etc.)

Expected:
- Grid renders square and fits within viewport
- Header and footer visible without scroll
- Tiles are large enough to tap (>40px recommended for Phase 8)
- Text is readable at default font size
- No horizontal scroll
```

### 5.5 Exit Criteria Verification

Before marking Phase 1 as DONE, verify all of the following:

```
✓ package.json
  - Exists at repository root
  - Contains "type": "module"
  - Defines start, test, build scripts
  - Valid JSON syntax

✓ index.html
  - Loads without 404 errors
  - Render viewport meta tag
  - Contains <div id="grid"> element
  - Contains <script type="module" src="src/index.js"></script>
  - No errors in browser console on load

✓ src/index.js
  - File exists at src/index.js
  - Initializes 256 tiles on DOM ready
  - Logs success message to console
  - No ES6 export/import (Phase 1 single-file)
  - No game logic or event listeners

✓ src/style.css
  - File exists at src/style.css
  - Grid renders 16×16 tiles visually
  - All tiles are square (aspect-ratio: 1/1)
  - No horizontal or vertical scroll at standard viewports
  - Tiles are distinct from background
  - Neutral color scheme (grays)

✓ .gitignore
  - File exists at repository root
  - Includes node_modules/, dist/, .env, .DS_Store

✓ README.md
  - File exists at repository root
  - Explains npm start, npm test, npm run build
  - Documents game rules and controls (for Phase 1 preview only)
  - Provides setup instructions

✓ npm Scripts
  - npm install runs without error
  - npm start starts HTTP server
  - npm test runs test runner (may be empty)
  - npm run build creates dist/ with copied files

✓ Browser Testing
  - Game loads in Chrome 90+
  - Game loads in Firefox 88+
  - Game loads in Safari 14+
  - No console errors on any browser
  - Grid renders identically across browsers

✓ Responsive Testing
  - Game renders at 320px, 768px, 1024px, 1440px
  - No scroll at any viewport size
  - Tiles remain square at all sizes
  - Text readable at all sizes
```

---

## 6. Code Scaffolding & Templates

### 6.1 Minimal JavaScript Structure (index.js)

Use this template for Phase 1:

```javascript
/**
 * PXL Sweeper - Main Entry Point
 * 
 * Initializes the game grid and waits for Phase 2+ logic.
 * Phase 1 is purely DOM initialization.
 */

// ==============
// INITIALIZATION
// ==============

function initializeGrid() {
  const gridContainer = document.getElementById('grid');
  
  // Validate DOM is ready
  if (!gridContainer) {
    console.error('❌ Grid container not found. Check index.html.');
    return;
  }
  
  // Create 256 tiles (16 × 16)
  for (let i = 0; i < 256; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    tile.textContent = ''; // Placeholder for Phase 3+
    gridContainer.appendChild(tile);
  }
  
  console.log('✓ Grid initialized: 16×16 (256 tiles)');
}

// ==============
// MAIN
// ==============

document.addEventListener('DOMContentLoaded', () => {
  initializeGrid();
  console.log('✓ PXL Sweeper Phase 1: Development Environment Ready');
});
```

### 6.2 HTML Template Structure

Use this template for index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="PXL Sweeper: Minimalist Minesweeper Game" />
    <title>PXL Sweeper</title>
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <div id="app">
      <header id="header">
        <h1>PXL Sweeper</h1>
        <div id="stats">Mines: <span id="mine-counter">40</span></div>
        <button id="restart-btn" style="display: none;">Restart</button>
      </header>
      <main id="game-container">
        <div id="grid"></div>
      </main>
    </div>
    <script type="module" src="src/index.js"></script>
  </body>
</html>
```

### 6.3 CSS Reset & Grid Template

Use this template for src/style.css:

```css
/* Global Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 0.5rem;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  max-width: 100vmin;
}

/* Grid 16×16 */
#grid {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
  gap: 1px;
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #ddd;
  padding: 0.5rem;
  border-radius: 0.25rem;
}

.tile {
  background-color: #c0c0c0;
  border: 1px solid #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
}
```

---

## 7. Summary & Gate Criteria

### 7.1 Phase 1 Gate Criteria (Must All Pass Before Proceeding to Phase 2)

1. **Repository State**
   - [ ] .git initialized and no uncommitted changes (after Phase 1 commit)
   - [ ] .gitignore prevents node_modules, dist/, .DS_Store from tracking

2. **File Presence**
   - [ ] package.json exists with correct fields
   - [ ] index.html exists with valid HTML5
   - [ ] src/index.js exists
   - [ ] src/style.css exists
   - [ ] .gitignore exists
   - [ ] README.md exists

3. **npm Scripts**
   - [ ] `npm install` completes successfully (node_modules created)
   - [ ] `npm start` runs server and serves on port 3000
   - [ ] `npm test` runs (even if empty)
   - [ ] `npm run build` completes without error (dist/ created)

4. **Browser Verification**
   - [ ] Game loads at http://localhost:3000 without 404 errors
   - [ ] Exactly 256 tiles render in a 16×16 grid
   - [ ] Grid is square (aspect ratio 1:1)
   - [ ] Browser console is clean (no errors or warnings on load)
   - [ ] Console logs show "✓ Grid initialized" and "✓ Phase 1: Ready"

5. **Responsive Tests**
   - [ ] Game renders correctly at 320px viewport size
   - [ ] Game renders correctly at 1024px viewport size
   - [ ] Game renders correctly at 1440px viewport size
   - [ ] No horizontal or vertical scroll at any tested viewport
   - [ ] Tiles remain square at all viewport sizes

6. **Cross-Browser Tests**
   - [ ] Chrome 90+: loads and renders correctly
   - [ ] Firefox 88+: loads and renders correctly
   - [ ] Safari 14+: loads and renders correctly (if available)

7. **Code Quality**
   - [ ] HTML is valid (W3C or browser DevTools validation)
   - [ ] CSS has no syntax errors
   - [ ] JavaScript has no syntax errors
   - [ ] No console warnings on page load
   - [ ] Code follows established patterns (filenames, structure)

8. **Documentation**
   - [ ] README.md explains clone, install, start steps
   - [ ] README.md documents game rules (preview for Phase 1)
   - [ ] Code has inline comments (minimal, for Phase 1)

### 7.2 Handoff to Phase 2

Once all gate criteria pass:

1. Commit Phase 1 work to git:
```bash
git add package.json index.html src/ .gitignore README.md
git commit -m "Phase 1: Project setup and scaffolding

- Initialize npm project with ES6 module support
- Create HTML5 document with 16×16 grid placeholder
- Add responsive CSS Grid layout (tiles remain square)
- Set up npm scripts for start, test, build
- Document setup and gameplay in README
- All 256 tiles render on page load
- No console errors or warnings"
```

2. Update @TODO.md with Phase 1 items as complete (move to @DONE.md)

3. Phase 2 implementation can begin

---

## Appendix: Troubleshooting

### Issue: "Cannot find module" or import errors

**Cause**: `"type": "module"` missing from package.json or incorrect import syntax.

**Fix**:
1. Verify package.json has `"type": "module"` at root level
2. Phase 1 uses no imports; future phases will use `import` keyword

### Issue: Tiles not rendering or grid appears empty

**Cause**: Grid container ID mismatch or JS error.

**Fix**:
1. Open DevTools Console (F12)
2. Check for JavaScript errors
3. Manually verify DOM: `document.getElementById('grid')` should return the grid div
4. Verify 256 tiles were created: `document.querySelectorAll('.tile').length` should return 256

### Issue: Tiles are rectangular instead of square

**Cause**: Browser doesn't support CSS `aspect-ratio` or viewport calculation is off.

**Fix**:
1. Update browser to latest version (Chrome 88+, Firefox 87+, Safari 14.1+)
2. Fallback: Add `height: 100%;` to #grid if aspect-ratio fails

### Issue: Page scrolls horizontally on mobile

**Cause**: Grid width exceeds viewport or padding is too large.

**Fix**:
1. Reduce padding: `padding: 0` or `padding: 0.25rem`
2. Reduce gap: `gap: 0` (but loses visual separation)
3. Verify viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`

### Issue: npm start fails with "port already in use"

**Cause**: Port 3000 is occupied by another process.

**Fix**:
1. Change port in package.json: `"start": "npx serve -l 3001"`
2. Or kill process: `lsof -ti:3000 | xargs kill -9` (macOS/Linux)
3. Or use different port: `npx serve -l <new-port>`

---

**Document Version**: 1.0  
**Last Updated**: 2024-04-21  
**Phase 1 of 9 Implementation Phases**
