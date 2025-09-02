/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row with block name
  const headerRow = ['Hero (hero18)'];

  // There is no background image in the provided HTML, so leave the image row empty
  const imageRow = [''];

  // Only include the desktop <p> if present, otherwise fallback to mobile <p>
  let headingEl = element.querySelector('.desktop p') || element.querySelector('.mobile p');
  let heading = '';
  if (headingEl && headingEl.textContent.trim()) {
    // Wrap the heading in a heading tag for correct block structure
    const h = document.createElement('h1');
    h.textContent = headingEl.textContent.trim();
    heading = h;
  } else {
    heading = element.textContent.trim();
  }

  const textRow = [heading];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
