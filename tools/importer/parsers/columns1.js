/* global WebImporter */
export default function parse(element, { document }) {
  // Find the Itinerary Map section (left column)
  let col1Content = [];
  const mapSection = element.querySelector('.destExpFilter__wrap--itinerary-map');
  if (mapSection) {
    // Map image (from .itinerary-details__map img)
    const mapImg = element.querySelector('.itinerary-details__map img');
    if (mapImg) col1Content.push(mapImg.cloneNode(true));
    // Title
    const title = mapSection.querySelector('h2');
    if (title) col1Content.push(title.cloneNode(true));
    // Description
    const desc = mapSection.querySelector('.destExpFilter__wrap--itinerary-desc');
    if (desc) col1Content.push(desc.cloneNode(true));
    // Button
    const btn = mapSection.querySelector('a.cta-light-btn');
    if (btn) col1Content.push(btn.cloneNode(true));
  }

  // Find the Destination Experiences section (right column)
  let col2Content = [];
  const overlap = element.querySelector('.multi-overlapping-image');
  if (overlap) {
    // Images
    const imgs = overlap.querySelectorAll('.overlappingImage__image img');
    imgs.forEach(img => col2Content.push(img.cloneNode(true)));
    // Title
    const intro = overlap.querySelector('.overlappingImage__intro');
    if (intro) col2Content.push(intro.cloneNode(true));
    // Text
    const text = overlap.querySelector('.overlappingImage__text');
    if (text) col2Content.push(text.cloneNode(true));
    // Button
    const btn = overlap.querySelector('button.cmp-button, .overlappingImage__cta button');
    if (btn) col2Content.push(btn.cloneNode(true));
  }

  // Fallback: if any column is empty, grab the first two major blocks
  if (!col1Content.length || !col2Content.length) {
    const topDivs = Array.from(element.children).filter(el => el.tagName === 'DIV');
    if (!col1Content.length && topDivs[0]) col1Content = [topDivs[0].cloneNode(true)];
    if (!col2Content.length && topDivs[1]) col2Content = [topDivs[1].cloneNode(true)];
  }

  // Compose table
  const headerRow = ['Columns (columns1)'];
  const contentRow = [col1Content, col2Content];
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
