/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children that are columns
  const columns = Array.from(element.querySelectorAll(':scope > .newFooter__topContainer-box'));

  if (!columns.length) return;

  // Block header row as per spec
  const headerRow = ['Columns (columns14)'];

  // Each cell is the full content of a column
  const contentRow = columns.map((col) => col);

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
