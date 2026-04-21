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
