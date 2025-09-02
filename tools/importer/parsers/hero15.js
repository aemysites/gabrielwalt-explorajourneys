/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the image element from <picture> and preserve its src
  function getImageFromPicture(picture) {
    if (!picture) return null;
    const img = picture.querySelector('img');
    if (!img) return null;
    // Create a new <img> element and copy src/alt attributes
    const newImg = document.createElement('img');
    newImg.src = img.getAttribute('src') || '';
    if (img.hasAttribute('alt')) newImg.setAttribute('alt', img.getAttribute('alt'));
    return newImg;
  }

  // Get the <picture> element (background image)
  const picture = element.querySelector('picture');
  const image = getImageFromPicture(picture);

  // Get the info container
  const info = element.querySelector('.subLevelCarousel__info');

  // Defensive: If info is missing, fallback to element
  const titleLink = info ? info.querySelector('.subLevelCarousel__name') : null;
  const ctaLink = info ? info.querySelector('.cta-white-btn.sub-level-link') : null;

  // Compose the text cell
  const textCellContent = [];
  if (titleLink) {
    // Create heading element for title
    const heading = document.createElement('h2');
    heading.textContent = titleLink.textContent;
    textCellContent.push(heading);
  }
  if (ctaLink) {
    // Use the CTA link as-is
    textCellContent.push(ctaLink);
  }

  // Table rows
  const headerRow = ['Hero (hero15)'];
  const imageRow = [image ? image : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Create the block table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
