/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  if (!columns.length) return;

  // For each column, collect its content as a single cell
  const cells = columns.map((col) => {
    // Find the image/media wrapper and text wrapper
    const media = col.querySelector('.b2c-2025-column-image__media');
    const text = col.querySelector('.b2c-2025-column-image__text-wrapper');
    // Defensive: collect all non-null elements
    const content = [];
    if (media) content.push(media);
    if (text) content.push(text);
    return content.length === 1 ? content[0] : content;
  });

  // Build the table rows
  const tableRows = [
    ['Columns (columns32)'], // Header row
    cells,                   // Content row (one cell per column)
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
