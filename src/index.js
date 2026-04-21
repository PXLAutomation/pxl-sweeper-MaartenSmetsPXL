/**
 * PXL Sweeper - Main Entry Point
 * Phase 1: Initialize DOM with 16×16 grid placeholder
 *
 * Responsibility: Create grid tiles and validate DOM is ready.
 * No game logic in Phase 1; purely DOM initialization.
 */

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

/**
 * Main initialization routine
 * Waits for DOM to be fully parsed before running.
 */
document.addEventListener('DOMContentLoaded', () => {
  initializeGrid();
  console.log('✓ PXL Sweeper Phase 1: Development Environment Ready');
});
