/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the wrapper containing the columns
  const wrapper = element.querySelector('.b2c-2025-awords__wrapper');
  if (!wrapper) return;

  // Find the image carousel container
  const imageContainer = wrapper.querySelector('.b2c-2025-awords__image.swiper-container');
  if (!imageContainer) return;

  // Get all column slides (each award)
  const columns = Array.from(imageContainer.querySelectorAll('.b2c-2025-awords__column.swiper-slide'));
  if (!columns.length) return;

  // Each column contains a <picture> element (the award image)
  const cellsRow = columns.map(col => {
    // Defensive: find the picture element
    const pic = col.querySelector('picture');
    return pic ? pic : document.createTextNode('');
  });

  // Table header row
  const headerRow = ['Columns (columns12)'];

  // Compose table rows
  const cells = [headerRow, cellsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
