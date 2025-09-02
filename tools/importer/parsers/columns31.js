/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main card container
  const card = element.querySelector('.highlightCard');
  if (!card) return;

  // Left column: Title, description, button
  const info = card.querySelector('.highlightCard__info');
  let leftColContent = [];
  if (info) {
    // Title
    const title = info.querySelector('.highlightCard__title h3');
    if (title) leftColContent.push(title);
    // Description
    const desc = info.querySelector('.highlightCard__desc');
    if (desc) leftColContent.push(desc);
    // Button
    const btnWrap = info.querySelector('.textImageVideoB2C__button .btn--left a');
    if (btnWrap) leftColContent.push(btnWrap);
  }

  // Right column: Image
  const imgWrap = card.querySelector('.highlightCard__img');
  let rightColContent = [];
  if (imgWrap) {
    // Find the <picture> or <img>
    const picture = imgWrap.querySelector('picture');
    if (picture) {
      rightColContent.push(picture);
    } else {
      const img = imgWrap.querySelector('img');
      if (img) rightColContent.push(img);
    }
  }

  // Build table rows
  const headerRow = ['Columns (columns31)'];
  const contentRow = [leftColContent, rightColContent];

  // Create block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element
  element.replaceWith(table);
}
