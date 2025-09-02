/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main container for the highlight row
  const container = element.querySelector('.highlightRow__container') || element;

  // Find the highlightCard (left column)
  const card = container.querySelector('.highlightCard');
  let leftColContent = [];
  if (card) {
    // Title
    const title = card.querySelector('.highlightCard__title');
    if (title) leftColContent.push(title);
    // Description
    const desc = card.querySelector('.highlightCard__desc');
    if (desc) leftColContent.push(desc);
    // CTA Button
    const btnWrap = card.querySelector('.textImageVideoB2C__button');
    if (btnWrap) leftColContent.push(btnWrap);
  }

  // Find the image (right column)
  let rightColContent = null;
  const imgWrap = container.querySelector('.highlightCard__img');
  if (imgWrap) {
    // Use the <picture> element if present
    const picture = imgWrap.querySelector('picture');
    if (picture) {
      rightColContent = picture;
    } else {
      // Fallback: use any <img> inside
      const img = imgWrap.querySelector('img');
      if (img) rightColContent = img;
    }
  }

  // Build the table rows
  const headerRow = ['Columns (columns16)'];
  const contentRow = [leftColContent, rightColContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
