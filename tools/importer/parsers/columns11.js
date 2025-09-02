/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row as required
  const headerRow = ['Columns (columns11)'];

  // For each column, collect its content as a single cell (reference, not clone)
  const contentRow = columns.map((col) => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
