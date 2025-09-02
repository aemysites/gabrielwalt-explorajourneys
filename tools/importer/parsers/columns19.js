/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main inner wrapper
  const inner = element.querySelector('.twoColImgText__inner');
  if (!inner) return;

  // Get the two columns
  const cols = inner.querySelectorAll(':scope > .twoColImgText__col');
  if (cols.length !== 2) return;

  // --- First column: main image ---
  // Find the first <picture> or <img> inside the first column
  let mainImg = cols[0].querySelector('picture, img');
  if (!mainImg) {
    // fallback: try to find any image
    mainImg = cols[0].querySelector('img');
  }
  // Use the picture element directly if found
  const col1Content = mainImg ? mainImg : cols[0];

  // --- Second column: small image + text ---
  const smallImgWrap = cols[1].querySelector('.twoColImgText__smallImg');
  let smallImg = smallImgWrap ? smallImgWrap.querySelector('picture, img') : null;
  // Title
  const title = cols[1].querySelector('.twoColImgText__title');
  // Description (may contain <p> and <ul>)
  const desc = cols[1].querySelector('.twoColImgText__desc');
  // Button
  const buttonWrap = cols[1].querySelector('.twoColImgText__button');

  // Compose second column content
  const col2Content = [];
  if (smallImg) col2Content.push(smallImg);
  if (title) col2Content.push(title);
  if (desc) col2Content.push(desc);
  if (buttonWrap) col2Content.push(buttonWrap);

  // Table header
  const headerRow = ['Columns (columns19)'];
  // Table content row: two columns
  const contentRow = [col1Content, col2Content];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
