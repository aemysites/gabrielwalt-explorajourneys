/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the inner block root
  const blockRoot = element.querySelector('.textImageVideoB2C');
  if (!blockRoot) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero17)'];

  // --- IMAGE ROW ---
  // Find the image container
  let imageEl = null;
  const imageContainer = blockRoot.querySelector('.textImageVideoB2C__image');
  if (imageContainer) {
    // Prefer the <img> inside <picture>
    const img = imageContainer.querySelector('img');
    if (img) {
      imageEl = img;
    } else {
      // fallback: use the <picture> itself
      const picture = imageContainer.querySelector('picture');
      if (picture) imageEl = picture;
    }
  }
  const imageRow = [imageEl ? imageEl : ''];

  // --- CONTENT ROW ---
  // Find the title (h1)
  let contentFragments = [];
  const info = blockRoot.querySelector('.textImageVideoB2C__info');
  if (info) {
    // Title
    const h1 = info.querySelector('h1');
    if (h1) contentFragments.push(h1);
    // (No subheading or CTA in this example, but could be added here if present)
  }
  const contentRow = [contentFragments.length ? contentFragments : ''];

  // --- BUILD TABLE ---
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
