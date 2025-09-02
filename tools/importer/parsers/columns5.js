/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main container for the highlight row
  const container = element.querySelector('.highlightRow__container') || element;

  // Find the highlightRow block (should be only one)
  const highlightRow = container.querySelector('.highlightRow');
  if (!highlightRow) return;

  // Get the highlightCard inside highlightRow
  const card = highlightRow.querySelector('.highlightCard');
  if (!card) return;

  // Extract left column: info (title + description)
  const info = card.querySelector('.highlightCard__info');
  // Extract right column: image
  const img = card.querySelector('.highlightCard__img');

  // Prepare the table rows
  const headerRow = ['Columns (columns5)'];
  const contentRow = [info, img].filter(Boolean); // Only include non-null columns

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}
