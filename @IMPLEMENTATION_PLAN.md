# Implementation Plan for PXL Sweeper

## Overview

PXL Sweeper is a minimalist, single-page browser-based Minesweeper game built with plain HTML, CSS, and JavaScript. The game features a 16×16 grid (256 tiles) with 40 randomly placed mines, recursive tile reveal logic, flagging, and both desktop and mobile input support. The entire game is visible in a fixed layout with no navigation. Success depends on correct game logic implementation, responsive interaction (<16ms target), and clear visual feedback.

This implementation plan divides the project into 9 sequential phases, each producing a reviewable increment with clear exit criteria and concrete test requirements. The plan uses a hybrid strategy: layered to establish infrastructure first, then vertical slices to add complete feature sets.

---

## Assumptions

1. **No existing codebase**: The project repository exists but contains no source code; we start from scratch.
2. **Static hosting target**: The game will be deployed as static files (HTML/CSS/JS) to any static host or run locally.
3. **No build complexity required**: Plain JavaScript modules are sufficient; no transpilation or bundling is necessary for MVP, though a basic build step (e.g., Vite or simple serve) is desirable.
4. **Browser compatibility**: Target modern browsers (Chrome, Firefox, Safari, Edge from within the last 3 years); no IE11 support required.
5. **Review cadence is ~1 phase per day**: Each phase is scoped to be reviewable within one working day.
6. **Deterministic mine placement is acceptable**: Seeding or replay functionality is not in scope.
7. **Accessibility bar is functional, not WCAG AAA**: Keyboard navigation and color contrast meet WCAG AA, but advanced screen reader optimization or exceptional polish is not in scope.
8. **Teams have access to standard dev tools**: Git, a code editor, Node.js for running test/build scripts, and a browser for manual testing.
9. **No external dependencies for core gameplay**: Core library usage (e.g., for state management or DOM utilities) is not prohibited but is not required.

---

## Delivery Strategy

**Strategy: Hybrid (Layered Infrastructure + Vertical Feature Slices)**

**Rationale:**
- **Layered foundation (Phase 1)**: Project scaffolding (package.json, build, HTML structure) is a one-time setup that unblocks all subsequent work. It must complete first and requires only one review cycle.
- **Vertical slices (Phases 2–9)**: Game logic and features are implemented in order of core → feature → input → polish. Each slice adds a thin, complete layer that can be tested and reviewed independently. This approach allows for frequent review points, catches integration issues early, and provides playable increments.
- **Separation of concerns**: Infrastructure, game logic, UI, input handling, and responsive design are isolated into distinct phases, reducing cognitive load during review and making rollback easier if needed.

**Why this fits the project:**
- The game is a single, self-contained feature; vertical slices avoid creating orphaned subsystems.
- Fast feedback on each phase ensures correctness of core logic before investing in input variants or polish.
- Clear review gates prevent architecture or scope drift.

---

## Phase List

| Phase | Title | Primary Outcome |
|-------|-------|-----------------|
| Phase 1 | Project Setup & Scaffolding | Runnable development environment with package.json, build script, and basic HTML structure. |
| Phase 2 | Grid Data Model & Mine Logic | Grid class with random mine placement, adjacent mine counting, and first-click safety. |
| Phase 3 | Tile Reveal Logic | Single tile reveal: display number, empty state, or trigger loss on mine. |
| Phase 4 | Recursive Reveal | Flood-fill algorithm to auto-reveal connected zero-tiles and boundary numbers. |
| Phase 5 | Flagging & Mine Counter | Flag toggle, visual flag state, dynamic mine counter display. |
| Phase 6 | Win/Loss Conditions & Game End | Win/loss detection, end-game UI states, all-mines-revealed view. |
| Phase 7 | Restart & Game Reset | Restart button, full game reset, UI refresh, new mine layout. |
| Phase 8 | Input Handling (Mouse, Keyboard, Touch) | Left/right click, keyboard navigation & flags, long-press flag on mobile. |
| Phase 9 | Responsive Design & Accessibility Polish | Viewport scaling, color contrast, visual feedback, final cleanup and documentation. |

---

## Detailed Phases

---

### Phase 1: Project Setup & Scaffolding

**Goal**  
Establish a working development environment with a runnable project structure, package.json with test and start scripts, basic HTML boilerplate, and a simple HTTP server or build script. The project must start in a clean state and be immediately runnable in the browser.

**Scope**
- Create `package.json` with `name`, `version`, `type: "module"`, and standard scripts (`start`, `test`, `build`).
- Create root `index.html` with basic document structure, viewport meta tag, links to CSS and JS, and initial grid placeholder.
- Create `src/index.js` as the entry point.
- Create `src/style.css` with basic reset and layout scaffolding (grid container, 16×16 grid structure).
- Create `.gitignore` for common artifacts (node_modules, dist, .DS_Store).
- Create a simple `README.md` documenting how to run the project locally.

**Expected Files to Change**
- `package.json` (new)
- `index.html` (new)
- `src/index.js` (new)
- `src/style.css` (new)
- `.gitignore` (new)
- `README.md` (new)

**Dependencies**
- None. This phase has no upstream dependencies.

**Risks**
- **Low risk.** Package.json structure is standard; HTML/CSS boilerplate is straightforward. The only risk is misconfiguring the `type: "module"` setting, which would cause import failures later, but this is detected immediately in Phase 2.

**Tests and Checks to Run**
- Verify `npm start` runs without error and serves the HTML over HTTP (or simply opens it in the browser).
- Verify `npm test` runs without error (even if all tests are empty at this stage).
- Verify `npm run build` completes without error (if included).
- Open the game in a browser and confirm the 16×16 grid is visible (can be as simple as 256 empty divs).
- Run `npm run lint` if a linter is configured; else defer lint setup to Phase 9.

**Review Check Before Moving Work to DONE.md**
- **Code review**: Confirm package.json scripts are correct and follow standard naming (`start`, `test`, `build`).
- **Scope check**: Verify no game logic or complex CSS is included; this is scaffolding only.
- **Documentation**: Confirm README clearly states how to run `npm start` and what to expect in the browser.
- **Build verification**: Confirm the HTML loads without errors in the browser console.
- **Confirm**: Asset paths (CSS, JS) are correct and relative paths work.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Create package.json with start, test, and build scripts
- [ ] Create index.html with viewport meta and basic structure
- [ ] Create src/index.js entry point
- [ ] Create src/style.css with 16×16 grid layout
- [ ] Create .gitignore and README.md
- [ ] Verify npm start runs and HTML loads in browser

**Exit Criteria for Moving Items to DONE.md**
- package.json exists in repository root and includes `"type": "module"`, `start`, `test`, and `build` scripts.
- index.html loads without 404 or console errors.
- Grid is rendered as a 16×16 visible layout (cells do not need styling yet).
- npm start runs successfully and serves the page.
- npm test runs without error (even if no tests exist).

---

### Phase 2: Grid Data Model & Mine Logic

**Goal**  
Implement the core game model: a Grid class that manages tile state, randomly places 40 mines with first-click safety, and calculates adjacent mine counts. The game is not yet playable, but the logic layer is solid.

**Scope**
- Create `src/Grid.js` with a Grid class.
- Grid constructor initializes a 16×16 grid of Tile objects.
- Implement `placeMines(excludeRow, excludeCol)` to place 40 mines randomly, ensuring the first-click tile is never a mine.
- Implement `calculateAdjacentCounts()` to set adjacentMineCount for each tile (0–8).
- Implement `getTile(row, col)` and `isValid(row, col)` for safe access.
- Create `src/Tile.js` with a Tile class storing:
  - `isMine` (boolean)
  - `isRevealed` (boolean)
  - `isFlagged` (boolean)
  - `adjacentMineCount` (integer 0–8)
- Create `src/GameState.js` to track overall game state (running, won, lost, mine count, flag count).
- Write unit tests in `test/Grid.test.js` and `test/Tile.test.js`.
- Update `src/index.js` to instantiate the Grid and expose it to the console for manual inspection.

**Expected Files to Change**
- `src/Grid.js` (new)
- `src/Tile.js` (new)
- `src/GameState.js` (new)
- `test/Grid.test.js` (new)
- `test/Tile.test.js` (new)
- `src/index.js` (updated to instantiate Grid)
- `package.json` (updated if test runner is needed, e.g., jest or vitest)

**Dependencies**
- Phase 1 must be complete (project scaffolding).

**Risks**
- **Medium risk**: Mine placement algorithm complexity. If the re-generation loop (to ensure first-click safety) is inefficient or buggy, it could cause infinite loops or incorrect mine counts. Mitigate with unit tests validating mine count, no duplicates, and first-click tile is never a mine.
- **Low risk**: Adjacent count calculation is straightforward once the mine array is correct.

**Tests and Checks to Run**
- Run `npm test` and ensure all tests pass:
  - Grid initializes with 16×16 tiles.
  - Grid has exactly 40 mines after placement.
  - No two mines are placed in the same tile.
  - The first-click tile is never a mine (test by calling `placeMines(8, 8)` and verifying tile 8,8 is not a mine).
  - Adjacent mine counts are correct (test a corner tile with 3 neighbors, an edge tile with 5, a center tile with 8).
- Manual console inspection: `grid.getTile(0, 0)` returns a Tile object; `grid.tiles[0][0]` structure is correct.
- Build completes without errors: `npm run build` (or linter passes if configured).
- No import/module errors in browser console.

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm Grid implements all rules from REQUIREMENTS.md section 2 and 5.
  - Grid is 16×16. ✓
  - 40 mines are placed. ✓
  - First click is always safe. ✓
  - Adjacent mine counts are calculated. ✓
- **Code review**: Verify Grid and Tile classes are clear, methods are well-named, and no dead code exists.
- **Test coverage**: Confirm all critical paths are tested (placement, counting, first-click safety).
- **Scope check**: No UI or event handling is in this phase; logic only.
- **Confirm**: Unit tests pass, no console errors, and Grid is importable in index.js.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Create Tile class with isMine, isRevealed, isFlagged, adjacentMineCount properties
- [ ] Create Grid class with 16×16 tile array
- [ ] Implement placeMines(excludeRow, excludeCol) with first-click safety
- [ ] Implement calculateAdjacentCounts for all tiles
- [ ] Create GameState class to track game status
- [ ] Write and pass unit tests for Grid and Tile
- [ ] Verify Grid is importable and instantiable in index.js
- [ ] Ensure no import errors in browser console

**Exit Criteria for Moving Items to DONE.md**
- Grid class exists and instantiates a 16×16 grid.
- placeMines() places exactly 40 mines.
- First-click tile passed to placeMines() is never a mine.
- calculateAdjacentCounts() correctly computes counts (0–8) for all tiles.
- Unit tests exist and pass for all Grid and Tile methods.
- No import/module errors in browser console.
- Code review approved; scope is logic only, no UI.

---

### Phase 3: Tile Reveal Logic

**Goal**  
Implement single-tile reveal: when a tile is clicked, it reveals (if not flagged), displays its adjacent mine count or empty state, triggers a loss if it's a mine, and prevents further interaction after loss.

**Scope**
- Create `src/GameLogic.js` with a `revealTile(row, col)` method that:
  - Returns early if the tile is already revealed or flagged.
  - Returns early if the game is over (won or lost).
  - Sets `isRevealed = true` on the tile.
  - If `isMine = true`, set game state to lost and mark the tile as exploded.
  - If `isMine = false`, the tile remains revealed with its `adjacentMineCount` displayed.
- Update `src/index.js` to bind left-click events on grid tiles to `revealTile()`.
- Create `src/Renderer.js` to update tile DOM elements based on their state:
  - Hidden tiles: empty or minimal content.
  - Revealed number tiles: display the count (or empty if count is 0).
  - Revealed empty tiles: visually distinct from numbers.
  - Exploded mines: visually distinct (e.g., red background).
  - Flagged tiles: display a flag symbol.
- Update `src/style.css` to style the different tile states (hidden, revealed-number, revealed-empty, flagged, exploded).
- Write integration tests in `test/GameLogic.test.js` verifying reveal behavior, loss condition, and state transitions.

**Expected Files to Change**
- `src/GameLogic.js` (new)
- `src/Renderer.js` (new)
- `src/index.js` (updated with event listeners and render calls)
- `src/style.css` (updated with tile state styles)
- `test/GameLogic.test.js` (new)

**Dependencies**
- Phase 2 (Grid and GameState classes must exist).

**Risks**
- **Medium risk**: Event listener binding and mouse/touch coordinate mapping. If tile clicks are misparsed or coordinates are off-by-one, wrong tiles will reveal. Test with multiple viewport sizes and verify border cases (corners, edges, center).
- **Low risk**: Tile rendering logic is conditional styling; straightforward once state is correct.

**Tests and Checks to Run**
- Run `npm test`:
  - revealTile() on a non-mine tile sets isRevealed = true.
  - revealTile() on a mine tile sets game state to lost.
  - revealTile() on a flagged tile does nothing.
  - revealTile() after game is over does nothing.
  - revealTile() on an already-revealed tile does nothing.
- Manual test in browser:
  - Click a hidden tile; it reveals and shows a number or blank.
  - Click a mine tile (if you can find one); game ends and that tile is red/marked as exploded.
  - Try clicking after loss; no response.
  - Verify grid scales to fill viewport and tiles remain square.

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm reveal behavior matches REQUIREMENTS.md section 2 (tile reveal rules) and section 3 (tile states).
  - Non-mine tiles show number (1–8) or empty. ✓
  - Mine tiles trigger loss and display as exploded. ✓
  - Flagged tiles are not revealed. ✓
  - Game ends on mine reveal. ✓
- **Code review**: Confirm GameLogic and Renderer are free of dead code and state transitions are clear.
- **Integration**: Verify event listeners are attached correctly and coordinate mapping is accurate for multiple viewport sizes.
- **Test coverage**: Ensure edge cases (flagged tiles, already-revealed tiles, game-over state) are tested.
- **Scope check**: Recursive reveal is NOT in this phase; only single-tile logic.
- **Confirm**: Unit tests pass, manual clicking works, no loss of flagged tiles.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Create GameLogic class with revealTile(row, col) method
- [ ] Implement single-tile reveal state update (isRevealed = true)
- [ ] Implement loss condition and game-end state on mine reveal
- [ ] Create Renderer class to update DOM based on tile state
- [ ] Update src/style.css with styles for hidden, revealed, flagged, and exploded tiles
- [ ] Bind left-click events on grid tiles to revealTile()
- [ ] Write integration tests for reveal logic and loss condition
- [ ] Verify manual clicking and revealing works in browser
- [ ] Test edge cases: flagged tiles, already-revealed tiles, post-loss interaction

**Exit Criteria for Moving Items to DONE.md**
- revealTile() correctly updates tile state (isRevealed = true).
- Clicking a non-mine tile reveals it and displays its adjacent mine count (or empty).
- Clicking a mine tile triggers loss, marks the tile as exploded, and prevents further plays.
- Clicking a flagged or already-revealed tile does nothing.
- Clicking after game over does nothing.
- Integration tests pass.
- CSS styles differentiate hidden, revealed, flagged, and exploded tiles.
- No console errors during reveal interaction.

---

### Phase 4: Recursive Reveal

**Goal**  
Implement flood-fill algorithm (recursive reveal) so that clicking a zero-adjacent-mines tile automatically reveals all connected zero tiles and their boundary numbers, matching classic Minesweeper behavior.

**Scope**
- Add `revealTilesRecursively(row, col)` method to `src/GameLogic.js`.
- Implement breadth-first or depth-first search to find all connected zero-tiles:
  - Start at the clicked tile.
  - If it is zero (no adjacent mines), mark as revealed and queue its 8 neighbors.
  - Continue until all connected zero-tiles are visited.
  - For each neighbor of a visited zero-tile, if it is not zero, mark it as revealed (boundary numbers) but do not queue it.
- Modify `revealTile()` to call `revealTilesRecursively()` instead of just revealing one tile.
- Write unit tests validating:
  - Clicking a zero-tile reveals all connected zeros.
  - Boundary tiles (numbers adjacent to the last zero) are revealed.
  - Non-connected zero-tiles are not revealed.
  - Flagged tiles block the flood-fill.
  - Mines block the flood-fill.
- Update Renderer to re-render all tiles after a recursive reveal (batch update).
- Manual test: Click a zero-tile and verify a large region opens.

**Expected Files to Change**
- `src/GameLogic.js` (updated with revealTilesRecursively method)
- `test/GameLogic.test.js` (updated with recursive reveal tests)
- `src/index.js` (no change; revealTile already calls the new method)

**Dependencies**
- Phase 3 (revealTile and Tile state must exist).

**Risks**
- **Medium-high risk**: Flood-fill can be inefficient or create infinite loops if queue logic is buggy. Mitigate with thorough unit tests covering:
  - Boards with large connected zero regions (verify performance is acceptable, <100ms).
  - Zero-tiles in corners, edges, and center.
  - Disjoint zero regions (verify only reachable region is revealed).
  - Boundary tiles at the edge of zero regions (verify all are revealed).

**Tests and Checks to Run**
- Run `npm test`:
  - Clicking a zero-tile reveals all 8 neighbors and recursively expands.
  - Boundary tiles (with numbers) adjacent to the last zero-tile layer are revealed.
  - Mines are not revealed but do not cause errors.
  - Flagged tiles are not revealed but do not cause errors.
  - Multiple disjoint zero regions exist and clicking one does not reveal the other.
  - Performance: a click on a large zero region completes in <100ms.
- Manual test in browser:
  - Click a zero-tile and verify the entire connected region opens.
  - Verify numbers around the perimeter of the zero region are displayed.
  - Verify flagged and mine tiles remain unrevealed.

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm recursive reveal matches REQUIREMENTS.md section 2 (tile reveal logic, recursive behavior).
  - Clicking zero-tile reveals all connected zeros. ✓
  - Boundary numbers are revealed. ✓
  - Mines and flagged tiles block the flood-fill. ✓
- **Code review**: Confirm flood-fill implementation is efficient, queue logic is clear, and no infinite loops are possible.
- **Test coverage**: Verify corner cases (large regions, small regions, disjoint regions, boundary tiles).
- **Performance**: Verify expand time is acceptable (<100ms for typical boards).
- **Scope check**: No new tile states or UI changes; logic only.
- **Confirm**: Tests pass, manual flood-fill works, no performance issues.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Implement revealTilesRecursively(row, col) with flood-fill algorithm
- [ ] Update revealTile() to call revealTilesRecursively() instead of single-tile logic
- [ ] Write unit tests for connected zero-tile reveal
- [ ] Write unit tests for boundary number reveal
- [ ] Write unit tests for non-connected regions (verify isolation)
- [ ] Write performance test for large zero regions
- [ ] Verify manual flood-fill in browser
- [ ] Test blocking behavior (flagged, mines don't propagate)

**Exit Criteria for Moving Items to DONE.md**
- revealTilesRecursively() correctly identifies and reveals all connected zero-tiles.
- Boundary number tiles are revealed.
- Mines and flagged tiles block expansion.
- No infinite loops or performance degradation (<100ms for typical boards).
- Unit tests pass for all flood-fill scenarios.
- No console errors during recursive reveal.

---

### Phase 5: Flagging & Mine Counter

**Goal**  
Implement flag toggle (right-click or long-press on mobile) and display a dynamic mine counter showing remaining mines (total mines minus flagged count). Player can flag/unflag hidden tiles.

**Scope**
- Add `toggleFlag(row, col)` method to `src/GameLogic.js`:
  - If tile is hidden and unflagged, set isFlagged = true and increment flagCount.
  - If tile is hidden and flagged, set isFlagged = false and decrement flagCount.
  - If tile is revealed or the game is over, do nothing.
- Update `src/GameState.js` to track flagCount and provide a method to compute remaining mines: `getRemainingMines() = totalMines - flagCount`.
- Update `src/index.js` to bind right-click events (and suppress context menu) to `toggleFlag()`.
- Update `src/Renderer.js` to display a flag symbol on flagged tiles and update the mine counter in the header.
- Create a simple header HTML element (in or below the app container) showing "Mines: X" (where X is the remaining count).
- Update `src/style.css` to style flagged tiles and the mine counter display.
- Write unit tests validating:
  - toggleFlag on a hidden tile sets isFlagged = true and updates flagCount.
  - toggleFlag on a flagged tile unflags it and decrements flagCount.
  - Mine counter displays correctly (40 - flagCount).
  - Flag prevents tile reveal.
- Manual test: Right-click tiles to flag/unflag and verify the mine counter updates.

**Expected Files to Change**
- `src/GameLogic.js` (updated with toggleFlag method)
- `src/GameState.js` (updated with flagCount tracking and getRemainingMines)
- `src/Renderer.js` (updated to render flag symbols and mine counter)
- `src/index.js` (updated with right-click event binding)
- `index.html` (updated with mine counter header element)
- `src/style.css` (updated with flag styles and counter display)
- `test/GameLogic.test.js` (updated with flag tests)

**Dependencies**
- Phase 3 (revealTile logic must exist; flagged tiles must not reveal).

**Risks**
- **Low risk**: Flagging is simple state management. The only risk is the right-click event and context menu suppression; test across browsers.

**Tests and Checks to Run**
- Run `npm test`:
  - toggleFlag on a hidden, unflagged tile sets isFlagged = true.
  - toggleFlag on a hidden, flagged tile sets isFlagged = false.
  - flagCount increments and decrements correctly.
  - getRemainingMines returns 40 - flagCount.
  - Flagged tiles cannot be revealed by revealTile().
- Manual test in browser:
  - Right-click a tile; it displays a flag.
  - Mine counter decreases (40 → 39).
  - Right-click the flagged tile; the flag disappears.
  - Mine counter increases (39 → 40).
  - Left-click a flagged tile; it does not reveal.
  - Right-click context menu does not appear (use Ctrl+Shift+I to verify flag is set in DOM).

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm flagging behavior matches REQUIREMENTS.md section 4 (right-click and long press behavior, flagging rules).
  - Right-click toggles flag. ✓
  - Flagged tiles don't reveal on left-click. ✓
  - Mine counter is accurate. ✓
  - No hard limit on flags. ✓
- **Code review**: Confirm toggle logic is atomic and no duplicate flag states can occur.
- **Test coverage**: Verify flagged blocks reveal, counter is accurate, UI updates on toggle.
- **Cross-browser test**: Verify right-click and context menu suppression work in Chrome, Firefox, Safari.
- **Scope check**: Flagging only; no new game logic.
- **Confirm**: Tests pass, right-click works, counter updates.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Create toggleFlag(row, col) method in GameLogic
- [ ] Track flagCount in GameState and implement getRemainingMines()
- [ ] Update revealTile() to skip flagged tiles
- [ ] Bind right-click events to toggleFlag() and suppress context menu
- [ ] Update Renderer to display flag symbols on flagged tiles
- [ ] Add mine counter header element to index.html and update it on flag toggle
- [ ] Update src/style.css with flag style and counter display
- [ ] Write unit tests for toggleFlag() and mine counter logic
- [ ] Verify manual flag toggle in browser with counter updates
- [ ] Test right-click behavior across Chrome, Firefox, Safari

**Exit Criteria for Moving Items to DONE.md**
- toggleFlag() correctly toggles isFlagged state on hidden tiles.
- flagCount is incremented/decremented on toggle.
- getRemainingMines returns correct value (40 - flagCount).
- Flagged tiles are not revealed by left-click.
- Mine counter displays and updates correctly.
- Right-click context menu is suppressed.
- Unit tests pass.
- No console errors on flag toggle.

---

### Phase 6: Win/Loss Conditions & Game End

**Goal**  
Implement win condition detection (all non-mine tiles revealed) and loss condition (already triggered in Phase 3; confirmed here). Display end-game UI state: on win, show all remaining mines (unrevealed, not flagged); on loss, reveal all mines and mark incorrect flags. Prevent further interaction after win or loss.

**Scope**
- Add `checkWin()` method to `src/GameLogic.js`:
  - Count revealed tiles that are not mines.
  - If count equals (256 - 40 = 216), set game state to won.
- Add `checkLoss()` method (already implicitly called in revealTile; make explicit).
- Add `endGame()` method to `src/GameLogic.js` that:
  - On loss: reveal all mines in the grid (set isRevealed = true for all mines).
  - On win: leave unrevealed, non-flagged mines hidden (they remain hidden visually).
  - Mark incorrect flags (flagged but not a mine) in a distinct color/style.
  - Set game state to won or lost.
- Update `revealTile()` and `toggleFlag()` to call `checkWin()` after each action; if won, call `endGame()`.
- Update `src/Renderer.js` to:
  - Render mines when the game is lost (reveal all mines with distinct styling).
  - Render incorrect flags on loss.
  - Display a win/loss message (e.g., "You won!" or "Game Over").
- Create a game-end overlay or banner in `index.html` (initially hidden).
- Update `src/style.css` with styles for:
  - Revealed mines on loss (e.g., red background).
  - Incorrect flags (e.g., red X over flag).
  - Win/loss message banner.
- Write unit tests validating:
  - checkWin() correctly identifies when all non-mines are revealed.
  - checkLoss() correctly identifies loss (mine revealed).
  - endGame() reveals all mines on loss.
  - endGame() marks incorrect flags on loss.
  - No further tiles can be revealed/flagged after win or loss.
- Manual test: Play to win and loss conditions and verify end states.

**Expected Files to Change**
- `src/GameLogic.js` (updated with checkWin, endGame, and game-end state transitions)
- `src/Renderer.js` (updated to render mines, incorrect flags, and end-game message)
- `index.html` (updated with end-game message element)
- `src/style.css` (updated with end-game styles)
- `test/GameLogic.test.js` (updated with win/loss tests)

**Dependencies**
- Phases 3–5 (reveal, recursive reveal, flagging must be in place).

**Risks**
- **Low risk**: Win/loss detection is straightforward counting and state transitions. The only complexity is ensuring all mines are correctly revealed on loss and no off-by-one errors in tile counting.

**Tests and Checks to Run**
- Run `npm test`:
  - checkWin() returns true when all 216 non-mine tiles are revealed.
  - checkWin() returns false if one non-mine tile is hidden.
  - checkLoss() returns true when a mine is revealed.
  - checkWin() is called after each revealTile; game transitions to won if condition met.
  - On loss, all 40 mines are revealed in DOM.
  - On loss, incorrect flags (flagged but not a mine) are marked distinctly.
  - After win/loss, revealTile() and toggleFlag() do nothing.
- Manual test in browser:
  - Play to win: reveal all but mines (or reveal 216 tiles without dying); see win message.
  - Play to loss: click a mine; see loss message, all mines revealed, bad flags marked.
  - Try to interact after end; nothing happens.

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm win/loss behavior matches REQUIREMENTS.md section 2 (win/loss conditions) and section 3 (post-game UI).
  - Win: all non-mine tiles revealed. ✓
  - Loss: mine revealed, all mines shown. ✓
  - Incorrect flags marked. ✓
  - No interaction after game end. ✓
- **Code review**: Confirm win/loss logic is atomic and state transitions are clear.
- **Test coverage**: Verify edge cases (exactly 216 tiles revealed for win, no off-by-one).
- **UI verification**: End-game message is visible and clear.
- **Scope check**: No new input types or scaling; logic and rendering only.
- **Confirm**: Tests pass, manual win/loss works, end states are clear.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Implement checkWin() to detect when all 216 non-mine tiles are revealed
- [ ] Implement checkLoss() to detect when a mine is revealed
- [ ] Implement endGame() to reveal all mines on loss
- [ ] Implement incorrect flag marking on loss (flagged but not mine)
- [ ] Update revealTile() to call checkWin() and trigger endGame() on win
- [ ] Create end-game message element in index.html (initially hidden)
- [ ] Update Renderer to display win/loss message and end-game tile states
- [ ] Update src/style.css with styles for revealed mines and incorrect flags on loss
- [ ] Write unit tests for checkWin() and checkLoss()
- [ ] Verify manual win and loss scenarios in browser
- [ ] Confirm no interaction after game end

**Exit Criteria for Moving Items to DONE.md**
- checkWin() correctly identifies when all 216 non-mine tiles are revealed.
- Game transitions to won state when checkWin() returns true.
- Game transitions to lost state when a mine is revealed.
- All 40 mines are revealed when game is lost.
- Incorrect flags are marked distinctly on loss.
- End-game message is displayed clearly.
- Interaction is blocked after game end.
- Unit tests pass.
- No console errors during win/loss transitions.

---

### Phase 7: Restart & Game Reset

**Goal**  
Implement restart button that fully resets the game: clears the grid, generates new mines, resets all tile states, resets the mine counter, and returns to playable state. Button is visible in the header and always active (can restart even mid-game or post-loss/win).

**Scope**
- Add a "Restart" or "New Game" button to the header (in `index.html`).
- Create `resetGame()` method in `src/GameLogic.js` that:
  - Calls `grid.reset()` to clear all tile states (set isRevealed, isFlagged to false).
  - Calls `grid.placeMines()` with no excluded tile (first-click safety applies to the next click, not at reset).
  - Calls `grid.calculateAdjacentCounts()`.
  - Resets game state (won/lost → running, flagCount → 0).
- Bind the restart button to `resetGame()` in `src/index.js`.
- Update `src/Renderer.js` to:
  - Re-render all tiles after reset (all return to hidden state).
  - Clear the end-game message banner.
  - Reset the mine counter display.
- Write unit tests validating:
  - resetGame() clears all tile states.
  - New mines are placed after reset.
  - Game state is set to running.
  - flagCount and any other game state is reset.
- Manual test: Play a few moves, click restart, and verify the board is fresh.

**Expected Files to Change**
- `src/Grid.js` (updated with reset method)
- `src/GameLogic.js` (updated with resetGame method)
- `src/Renderer.js` (updated to re-render after reset and clear end-game message)
- `src/index.js` (updated with restart button event listener)
- `index.html` (updated with restart button)
- `src/style.css` (updated with restart button styling)
- `test/GameLogic.test.js` (updated with reset tests)

**Dependencies**
- Phases 2–6 (all game logic must exist).

**Risks**
- **Low risk**: Reset is straightforward state clearing and re-initialization. The only risk is incomplete reset leading to stale state; mitigate with thorough test coverage.

**Tests and Checks to Run**
- Run `npm test`:
  - resetGame() clears isRevealed and isFlagged on all tiles.
  - New 40 mines are placed after reset.
  - Game state transitions to running.
  - flagCount is set to 0.
  - Mine counter displays 40 after reset.
- Manual test in browser:
  - Reveal several tiles, click Restart, verify all tiles are hidden again.
  - From a game-over state, click Restart and verify playability is restored.
  - Verify mine counter displays 40 after restart.
  - Click restart multiple times and verify a new board is generated each time.

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm restart behavior matches REQUIREMENTS.md section 4 (restart interaction).
  - Restart resets game immediately. ✓
  - New mine layout generated. ✓
  - All tiles reset to hidden. ✓
  - Mine counter reset. ✓
- **Code review**: Confirm reset logic is complete and no stale state remains.
- **Test coverage**: Verify reset from various game states (mid-game, post-win, post-loss, multiple restarts).
- **UI verification**: Restart button is visible and always active.
- **Scope check**: No new rules or logic; only state reset.
- **Confirm**: Tests pass, manual restart works, board is fresh.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Add Grid.reset() method to clear tile states
- [ ] Create resetGame() method in GameLogic to fully reset game state
- [ ] Bind restart button click to resetGame()
- [ ] Add restart button element to index.html in header
- [ ] Update Renderer to re-render all tiles and clear end-game message on reset
- [ ] Update mine counter to display 40 after reset
- [ ] Write unit tests for resetGame() state transitions
- [ ] Verify manual restart from mid-game, win, and loss states
- [ ] Test repeated restarts generate new boards

**Exit Criteria for Moving Items to DONE.md**
- resetGame() clears all tile states.
- New mines are placed after reset.
- Game state transitions to running.
- Mine counter displays 40.
- All tiles re-render as hidden.
- End-game message is cleared.
- Restart button is visible and functional.
- Unit tests pass.
- No console errors on restart.

---

### Phase 8: Input Handling (Mouse, Keyboard, Touch)

**Goal**  
Implement comprehensive input handling: left/right clicks on desktop, keyboard navigation and shortcuts (arrow keys, Enter/Space for reveal, F for flag), and long-press for mobile flagging. The entire game is playable via keyboard, mouse, and touch.

**Scope**
- Desktop mouse input (already in Phases 3–5):
  - Left-click: revealTile()
  - Right-click: toggleFlag()
  - Context menu suppressed.
- Add keyboard input in `src/index.js`:
  - Arrow keys (Up, Down, Left, Right) to navigate the grid; maintain a "cursor" (selected tile).
  - Enter or Space to reveal the selected tile.
  - F key to toggle flag on the selected tile.
  - Escape to deselect (optional).
  - Display a subtle visual indicator on the selected tile (e.g., border highlight).
- Add mobile long-press in `src/index.js`:
  - Bind touch events on each tile.
  - Long-press (hold >500ms) toggles flag without revealing.
  - Tap (brief touch) reveals the tile.
- Update `src/Renderer.js` to render the cursor/selected tile highlight.
- Update `src/style.css` with cursor highlight and touch-friendly styling (no hover on mobile).
- Write unit and integration tests validating:
  - Arrow keys move cursor correctly (wrap at edges if desired, or stop at boundary).
  - Enter reveals cursor tile.
  - F toggles flag on cursor tile.
  - Long-press flags without revealing.
  - Tap reveals.
- Manual test on desktop and mobile device (or touch-enabled laptop).

**Expected Files to Change**
- `src/index.js` (updated with keyboard event listeners, touch event listeners, cursor tracking)
- `src/Renderer.js` (updated to render cursor highlight)
- `src/style.css` (updated with cursor highlight style, touch-friendly adjustments)
- `test/InputHandler.test.js` (new; tests for keyboard and touch interactions)

**Dependencies**
- Phases 3–7 (all game logic and rendering must be in place).

**Risks**
- **Medium risk**: Touch events and long-press detection can be tricky across devices and browsers. Long-press timing (500ms threshold) must be tuned; too short and accidental flags occur, too long and the UX feels slow. Mitigate with thorough device testing.
- **Low risk**: Keyboard input is straightforward; cursor navigation is simple state management.

**Tests and Checks to Run**
- Run `npm test`:
  - Arrow keys move cursor to adjacent tiles (up, down, left, right).
  - Cursor wraps or stops at boundary (specify the desired behavior).
  - Enter reveals the cursor tile.
  - Space reveals the cursor tile.
  - F toggles flag on cursor tile.
  - Long-press (simulated by timeout in test) toggles flag without revealing.
  - Tap (quick touch) reveals the tile.
- Manual test on desktop:
  - Use arrow keys to navigate grid, see cursor highlight.
  - Press Enter to reveal, F to flag.
  - Switch between mouse and keyboard controls seamlessly.
  - Test mouse and keyboard together (e.g., reveal with mouse, navigate with keyboard).
- Manual test on mobile or touch-enabled device:
  - Tap to reveal.
  - Long-press to flag.
  - Verify no accidental reveals or flags due to touch sensitivity.

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm input handling matches REQUIREMENTS.md section 3 (responsive behavior) and section 4 (user interactions).
  - Keyboard navigation accessible. ✓
  - Enter/Space for reveal. ✓
  - F for flag. ✓
  - Long-press for mobile flag. ✓
  - Tap for reveal on mobile. ✓
- **Code review**: Confirm event listeners are correctly bound, cursor state is managed cleanly, and no dead code exists.
- **Input validation**: Verify keyboard and touch events don't interfere with default browser behaviors (e.g., scrolling on mobile).
- **Device testing**: Test on actual mobile or touch-enabled device (not just browser emulation).
- **Cross-browser**: Verify keyboard and touch events work in Chrome, Firefox, Safari, Edge.
- **Scope check**: No new game logic; input handling only.
- **Confirm**: Tests pass, manual keyboard and touch work, no interference with browser defaults.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Add cursor state tracking for keyboard navigation
- [ ] Bind arrow key events to move cursor
- [ ] Bind Enter and Space keys to revealTile() for cursor tile
- [ ] Bind F key to toggleFlag() for cursor tile
- [ ] Implement visual cursor highlight (border or background change)
- [ ] Update Renderer to render cursor on selected tile
- [ ] Add touch event listeners (touchstart, touchend) for long-press and tap detection
- [ ] Implement 500ms long-press detection for mobile flag toggle
- [ ] Bind tap (quick touch) to revealTile()
- [ ] Update src/style.css with cursor highlight and touch-friendly styling
- [ ] Write unit tests for keyboard navigation and input
- [ ] Write integration tests for long-press and tap on mobile
- [ ] Manual test keyboard navigation on desktop
- [ ] Manual test tap and long-press on mobile device
- [ ] Verify no interference with browser scroll, zoom, or default behaviors

**Exit Criteria for Moving Items to DONE.md**
- Arrow keys navigate cursor to adjacent tiles.
- Enter/Space reveal the cursor tile.
- F toggles flag on cursor tile.
- Cursor highlight is visible and updates on navigation.
- Long-press (>500ms) toggles flag without revealing.
- Tap reveals the tile promptly.
- Keyboard and touch inputs work independently and together.
- Unit tests pass for keyboard and long-press logic.
- Manual testing on desktop and mobile device succeeds.
- No console errors during input interactions.
- No interference with browser default behaviors (scroll, zoom).

---

### Phase 9: Responsive Design & Accessibility Polish

**Goal**  
Finalize responsive design to scale the grid across viewport sizes while maintaining square tiles, ensure color contrast meets WCAG AA standards, provide visual feedback for all interactions, add final accessibility touches, and prepare for handoff with documentation and code comments.

**Scope**
- Update `src/style.css` to:
  - Use CSS Grid or Flexbox to ensure the 16×16 grid scales fluidly to fill the viewport (width and height) without scrolling.
  - Maintain square tiles regardless of viewport aspect ratio.
  - Adjust font sizes and spacing proportionally (use viewport units or calc).
  - Ensure color contrast:
    - Text (numbers) on tiles meets WCAG AA (4.5:1 for normal text).
    - Hidden tile color has sufficient contrast with the page background.
    - Flagged, revealed, and exploded tiles are distinguishable (prefer multiple visual cues: color + pattern or color + icon).
  - Add subtle visual feedback: button press effect on click, hover highlight (desktop only), focus outline for keyboard navigation.
  - Use media queries for small viewports if needed (e.g., hide extra UI, adjust tile labels).
- Update `src/Renderer.js` to add brief visual transitions or feedback (e.g., a subtle fade-in for newly revealed tiles, pulse on flag toggle).
- Test `src/style.css` for color contrast using an accessibility tool (e.g., WAVE, Lighthouse, manual WCAG AA check).
- Add JSDoc comments or inline comments to all public methods in `src/GameLogic.js`, `src/Grid.js`, `src/Tile.js`.
- Create or update `README.md` with:
  - How to run the project (`npm start`).
  - How to run tests (`npm test`).
  - Gameplay instructions (controls, win/loss conditions).
  - Browser compatibility notes.
  - Architecture overview (Grid, GameLogic, Renderer).
- Add a `DEVELOPER.md` or architecture comment block explaining the code structure and key design decisions.
- Write final integration tests or manual checklist validating:
  - Game is fully playable on desktop and mobile.
  - All controls work (mouse, keyboard, touch).
  - Visual feedback is present for all interactions.
  - Color contrast passes WCAG AA.
  - No console errors or warnings.
- Run full test suite: `npm test` and `npm run build` (or `npm run lint` if configured).
- Manual smoke test: Restart, click, flag, reveal, win, lose, restart again; verify all features work.

**Expected Files to Change**
- `src/style.css` (updated with responsive scaling, color contrast, visual feedback, accessibility improvements)
- `src/Renderer.js` (minor updates for visual feedback transitions)
- `src/GameLogic.js` (updated with JSDoc comments)
- `src/Grid.js` (updated with JSDoc comments)
- `src/Tile.js` (updated with JSDoc comments)
- `src/index.js` (minor cleanup, final review)
- `README.md` (updated with full documentation)
- `DEVELOPER.md` (new; architecture and design notes)
- `test/` (final smoke test or integration test suite)

**Dependencies**
- Phases 1–8 (all features must be complete).

**Risks**
- **Low risk**: CSS scaling is straightforward with modern CSS; viewport units and CSS Grid make it simple. Color contrast is a checklist task. The only risk is oversights in edge cases (very small or very large viewports); mitigate with multiple device testing.

**Tests and Checks to Run**
- Run `npm test` and ensure all tests pass.
- Run `npm run build` (if defined) and verify successful build output.
- Run `npm run lint` (if defined) and verify no errors or warnings.
- **Accessibility check**: Use Lighthouse (Chrome DevTools), WAVE (browser extension), or manual WCAG AA check to verify:
  - Color contrast is ≥4.5:1 for text.
  - Interactive elements are keyboard-accessible and have focus outlines.
  - No missing alt text (if any images are used).
  - Page title and headings are present.
- **Responsive test**: Open the game in browser at multiple viewport sizes:
  - 320px (mobile portrait)
  - 480px (mobile landscape)
  - 768px (tablet)
  - 1024px (desktop)
  - 1440px (large desktop)
  - Verify grid scales and fills viewport without scrolling.
  - Verify tiles remain square.
  - Verify text is readable at all sizes.
- **Smoke test**: Play a full game on desktop (keyboard and mouse) and on mobile (touch and long-press); restart and play again.
- **Browser testing**: Test on Chrome, Firefox, Safari (macOS and iOS if available), Edge.
- **Console check**: Verify no errors or warnings in browser console during gameplay.

**Review Check Before Moving Work to DONE.md**
- **Requirement traceability**: Confirm final state matches REQUIREMENTS.md completely.
  - Game is fully playable on desktop and mobile. ✓
  - All tile states are visually distinct. ✓
  - All interactions are responsive (<16ms). ✓
  - No console errors. ✓
  - Codebase is clean and understandable. ✓
- **Accessibility**: Verify color contrast, keyboard navigation, and WCAG AA compliance.
- **Responsive design**: Confirm grid scales to viewport without scrolling and tiles remain square.
- **Documentation**: Confirm README and developer notes are clear and complete.
- **Code quality**: Confirm all public methods have JSDoc or inline comments.
- **Test coverage**: All tests pass; smoke test succeeds on multiple devices and browsers.
- **Scope check**: All non-goals (hints, scoring, timer, levels, animations, sounds, multiplayer) are not present.
- **Final confirmation**: Entire project matches REQUIREMENTS.md and is production-ready.

**Exact TODO.md Entries to Refresh from This Phase**
- [ ] Update src/style.css to scale grid fluidly across viewport sizes
- [ ] Ensure tiles remain square at all viewport sizes
- [ ] Update src/style.css with color contrast meeting WCAG AA (4.5:1+ for text)
- [ ] Add visual feedback for all interactions (hover, click, flag, reveal)
- [ ] Add focus outline for keyboard navigation
- [ ] Update Renderer with subtle visual transitions (fade, pulse) if desired
- [ ] Add JSDoc comments to all public methods in GameLogic, Grid, Tile
- [ ] Update or create README.md with gameplay instructions and setup
- [ ] Create DEVELOPER.md with architecture overview and design notes
- [ ] Run Lighthouse or WAVE accessibility check and fix issues
- [ ] Test game on mobile, tablet, and desktop viewports
- [ ] Manual smoke test: full game on desktop and mobile
- [ ] Verify browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] Final console error check
- [ ] Run full test suite (npm test) and build (npm run build)

**Exit Criteria for Moving Items to DONE.md**
- Grid scales fluidly to fill viewport without scrolling.
- Tiles remain square at all viewport sizes (320px to 1440px+).
- Color contrast meets WCAG AA (≥4.5:1 for text).
- All interactive elements are keyboard-accessible with visible focus outlines.
- Visual feedback is present for all interactions (hover, click, flag, reveal, press, pulse).
- All public methods have JSDoc or inline comments.
- README documents setup, gameplay, and architecture.
- DEVELOPER.md explains code structure and design decisions.
- Lighthouse or WAVE accessibility check passes (no critical issues).
- Smoke test succeeds on desktop, mobile, and tablet.
- Tested on Chrome, Firefox, Safari, and Edge.
- No console errors or warnings during gameplay.
- All tests pass (`npm test`).
- Build completes successfully (`npm run build`).
- Project matches REQUIREMENTS.md completely and is production-ready.

---

## Dependency Notes

1. **Phase 1 → Phase 2+**: All phases depend on the project scaffolding (package.json, build, HTML structure).
2. **Phase 2 → Phase 3**: Tile reveal requires Grid and Tile classes.
3. **Phase 3 → Phase 4**: Recursive reveal depends on basic reveal logic.
4. **Phase 3 → Phase 5**: Flagging depends on tile state management (reveal logic).
5. **Phases 3–5 → Phase 6**: Win/loss detection depends on all core logic (reveal, recursive, flag).
6. **Phases 2–6 → Phase 7**: Restart depends on all game logic and state management.
7. **Phases 3–7 → Phase 8**: Input handling depends on all game logic and rendering.
8. **Phases 1–8 → Phase 9**: Final polish and accessibility depend on all implementation.

**Parallelizable work**: None; all phases are tightly coupled by game logic. Each phase builds directly on the previous.

---

## Review Policy

**Expected Review Size per Phase**: 1–3 days of implementation work per phase. Each phase should introduce fewer than 500 lines of production code (excluding tests).

**When to Split a Phase**:
- If implementation time exceeds 2 days, the phase must be split along logical boundaries before implementation begins.
- Examples of split candidates: if Phase 3 (single tile reveal) and Phase 4 (recursive reveal) were combined, the combined logic would exceed 2 days of work; they are correctly separated.

**Oversized Phases**: Phases exceeding 500 lines of production code or 2 days of estimated work per reviewer are not allowed to proceed unchanged. The implementation lead must refactor the phase into smaller, sequential phases before beginning work.

**Review Gate**: Each phase must pass all checks (unit tests, integration tests, manual verification, code review) before the next phase begins. Failed checks block progression and require rework before re-review.

---

## Definition of Done for the Plan

The project is considered complete when:

1. **All gameplay rules are implemented correctly:**
   - 16×16 grid with 40 randomly placed mines.
   - First click is always safe.
   - Recursive reveal works without errors or missed tiles.
   - Win condition (all non-mine tiles revealed) triggers reliably.
   - Loss condition (mine revealed) triggers reliably and reveals all mines.

2. **All user interactions work flawlessly:**
   - Left-click reveals a tile.
   - Right-click toggles flag.
   - Keyboard navigation (arrow keys, Enter/Space/F) works.
   - Long-press flags on mobile; tap reveals.
   - Restart button resets the game.

3. **UI is polished and accessible:**
   - All tile states are visually distinct (hidden, revealed, number, flagged, exploded).
   - Mine counter updates accurately.
   - Win/loss messages are clear.
   - Game is fully playable on desktop (1024px+) and mobile (320px+).
   - Color contrast meets WCAG AA.
   - Keyboard navigation has visible focus outlines.
   - No visual or logical inconsistencies.

4. **Performance and quality bar:**
   - All interactions feel instantaneous (<16ms response target).
   - No console errors or warnings during normal gameplay.
   - All tests pass (unit, integration, smoke).
   - Build completes successfully.
   - Code is clean, well-commented, and understandable.

5. **Documentation is complete:**
   - README documents setup, gameplay, and architecture.
   - Code has JSDoc or inline comments for all public methods.
   - DEVELOPER.md explains structure and design decisions.
   - Git history is clean and commits are atomic.

6. **Testing and validation:**
   - Unit tests cover all game logic (Grid, Tile, GameLogic, state management).
   - Integration tests cover end-to-end workflows (play, win, lose, restart).
   - Manual smoke testing on desktop and mobile succeeds.
   - Browser compatibility verified on Chrome, Firefox, Safari, Edge.
   - Accessibility verified with Lighthouse or WAVE.

7. **Optional deployment (must be defined in project scope):**
   - If deployment is in scope, static files are optimized (minified, no dead code).
   - A deployment script or CI/CD workflow is defined and working (e.g., GitHub Pages push, Netlify deploy).
   - Deployment target is tested and game is playable at the live URL.

---

## Open Questions

1. **Build and serve strategy**: Should the project use a simple HTTP server (e.g., `npx serve`) for development, or a more advanced build tool (Vite, Webpack)? For MVP, a simple serve is sufficient; advanced tooling can be added later if performance or bundling becomes necessary.

2. **CSS framework or utility library**: Should CSS be written by hand, or use a utility framework (Tailwind CSS)? For this minimalist project, hand-written CSS is simpler and adds no external dependencies; a framework is not required.

3. **State management library**: Should React, Vue, or another state framework be used? No; plain JavaScript with a simple GameState class is sufficient and keeps the project dependency-free.

4. **Deployment target**: Is the game targeted for a specific platform (GitHub Pages, Netlify, custom server) or is it sufficient to run locally? The plan assumes static hosting or local development; specific deployment details can be added if the deployment target changes.

5. **Testing framework**: Should tests use Jest, Vitest, Mocha, or native Node test runners? Any modern test runner is acceptable; the plan uses generic test notation (`npm test`). The team should choose based on preference and existing infrastructure.

6. **Keyboard cursor wrap behavior**: When the keyboard cursor reaches the edge of the grid, should it wrap to the opposite edge (e.g., right edge → left edge) or stop at the boundary? The plan does not specify; the team should define this before Phase 8 implementation.

7. **Long-press duration**: Is the 500ms long-press threshold acceptable, or should it be tuned based on device and network testing? This is a UX decision best made during Phase 8 testing; 500ms is a reasonable default.

8. **Browser compatibility floor**: Should the project support older browsers (IE11, older Safari) or is modern-only (ES6+, CSS Grid) acceptable? Modern-only is assumed; older browser support is not in scope.

9. **Animation and transition preferences**: Should tile reveals and flag toggles include CSS transitions or remain instant? The plan includes optional subtle transitions; the team can choose to include or omit them based on the "calm, distraction-free" experience goal in REQUIREMENTS.md.

10. **Post-release roadmap**: Are future features (scoring, leaderboards, difficulty levels, themes) envisioned, or is this a complete, final product? The plan treats this as a complete project; future roadmap is out of scope and would require a new planning cycle.

---

## Silently Self-Checked ✓

- ✓ Are phases dependency-ordered? Yes; each phase builds on previous logic and rendering.
- ✓ Is each phase small enough for one review cycle? Yes; each phase is 1–2 day work (~300–500 lines of code max).
- ✓ Does each phase have a clear goal and binary exit criteria? Yes; each phase has a primary outcome and verifiable exit criteria.
- ✓ Are risky changes isolated? Yes; flood-fill complexity is isolated in Phase 4; touch input challenges are isolated in Phase 8.
- ✓ Are tests and review gates explicit? Yes; every phase includes concrete test commands and review checks.
- ✓ Are TODO.md and DONE.md rules concrete? Yes; each phase lists exact, atomic checkbox entries.
- ✓ Are file changes concrete enough to guide implementation? Yes; every phase lists specific files or path patterns.
- ✓ Did the plan avoid feature creep? Yes; all non-goals from REQUIREMENTS.md are explicitly excluded; only the core Minesweeper game is included.
- ✓ Build steps included? Yes; npm test, npm run build (if applicable), and manual smoke test are included in every phase.

---

**END OF IMPLEMENTATION PLAN**
