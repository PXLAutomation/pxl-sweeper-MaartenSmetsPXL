# REQUIREMENTS.md

## 1. Product Definition

A minimalist, single-page web-based Minesweeper game that faithfully reproduces the classic gameplay experience. The entire game is visible within a fixed layout, with no navigation or additional screens. The focus is on fast interaction, clarity of state, and a smooth, frustration-free user experience.

**Core Experience Goals:**

* Immediate understanding of game state
* Fast, responsive interactions with no perceptible delay
* Logical, deterministic-feeling gameplay (no confusion about outcomes)
* A calm, distraction-free interface that emphasizes the puzzle

---

## 2. Core Gameplay Rules

### Grid Behavior

* The game uses a fixed rectangular grid of **16 columns × 16 rows**
* Total tiles: 256

### Mine Placement Rules

* Total mines: **40**
* Mines are placed randomly at game start
* The first tile revealed by the player is **guaranteed not to be a mine**
* If the first click lands on a mine, mines are re-generated until the condition is satisfied

### Tile Reveal Logic

* Revealing a tile:

  * If it contains a mine → immediate loss
  * If it has adjacent mines → display number (1–8)
  * If it has zero adjacent mines → recursively reveal all connected zero-value tiles and their boundary numbers

### Number Calculation Rules

* Each revealed number indicates the count of mines in the 8 adjacent tiles (including diagonals)

### Win Condition

* The player wins when all **non-mine tiles are revealed**

### Loss Condition

* The player loses immediately upon revealing a mine
* The triggered mine is visually distinguished from others

---

## 3. User Interface & Layout

### Overall Layout

* Fixed layout with:

  * Top bar (header)
  * Centered game grid
* No scrolling at any viewport size
* Header contains:

  * Restart button
  * Mine counter (remaining mines = total mines - flags placed)

### Tile States

Each tile can be in one of the following states:

* Hidden
* Revealed (empty)
* Revealed (number 1–8)
* Flagged
* Exploded (triggered mine)
* Revealed mine (after loss)

### Visual Feedback

* Hover (desktop only): subtle highlight on tile
* Click/tap: immediate visual press feedback
* Reveal:

  * Instant (no animation delay)
* Flag:

  * Instant toggle
* Loss:

  * All mines revealed
  * Incorrect flags remain unchanged
* Win:

  * All mines remain hidden unless flagged

### Responsive Behavior

* Desktop:

  * Mouse interactions (left/right click)
* Mobile:

  * Tap = reveal
  * Long press = flag
* Grid scales to fit viewport while maintaining square tiles

---

## 4. User Interactions

### Left Click / Tap

* On hidden tile:

  * Reveal tile
* On revealed tile:

  * No action

### Right Click / Long Press

* On hidden tile:

  * Toggle flag
* On flagged tile:

  * Remove flag
* On revealed tile:

  * No action

### Restart Interaction

* Restart button resets the game immediately:

  * New mine layout
  * All tiles reset to hidden
  * Mine counter reset

### Edge Cases

* Clicking a flagged tile:

  * No reveal occurs
* Flagging:

  * No hard limit; player may place more flags than mines
* First click:

  * Always safe (never a mine)
* Clicking after game end:

  * No interaction allowed

---

## 5. Game State Management

### State Representation

* Grid: 2D array of tiles
* Each tile stores:

  * `isMine` (boolean)
  * `isRevealed` (boolean)
  * `isFlagged` (boolean)
  * `adjacentMineCount` (integer 0–8)

### Initialization / Reset

* On load or restart:

  * Empty grid initialized
  * Mines placed randomly
  * Adjacent counts calculated

### Determinism vs Randomness

* Mine placement is **random per game**
* No seeding or persistence
* Each restart produces a new board

---

## 6. Constraints & Non-Goals

Explicitly excluded:

* No hints or assistance systems
* No scoring system
* No timer
* No levels or difficulty selection
* No animations beyond minimal feedback
* No sound effects
* No multiplayer or sharing features
* No persistent state (no saving progress)

---

## 7. Technical Constraints

* Single-page application (no routing)
* No backend; fully client-side
* Must run instantly on load (no loading states)
* All interactions must feel instantaneous (<16ms response target)
* No external dependencies required for core gameplay

### Accessibility Baseline

* All actions accessible via keyboard:

  * Arrow keys to navigate grid
  * Enter/Space to reveal
  * Key (e.g. “F”) to toggle flag
* Color contrast sufficient to distinguish tile states
* Numbers must be distinguishable without relying solely on color

---

## 8. Definition of Done

The project is complete when:

* All gameplay rules are implemented correctly and consistently
* First click is always safe
* Recursive reveal works without errors or missed tiles
* Win and loss conditions trigger reliably
* UI reflects all tile states clearly
* Interactions are responsive with no noticeable lag
* Game is fully playable on both desktop and mobile
* No visual or logical inconsistencies remain
* No console errors occur during normal gameplay
* Codebase is clean and understandable

## Project Setup Requirements

- The project shall include a `package.json` file in the repository root.
- The `package.json` file shall define the project's runnable commands in a consistent way.
- The `package.json` file shall include at least a `test` script so the same test command can be run every time.
- If the project uses ES module imports in JavaScript, `package.json` shall set `"type": "module"`.
- The project shall remain compatible with a plain JavaScript, static-site workflow.

## tech stack

plain html, css, javascript