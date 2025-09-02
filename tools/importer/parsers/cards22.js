/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the swiper-wrapper containing all cards
  const wrapper = element.querySelector('.swiper-wrapper');
  if (!wrapper) return;

  // Get all direct card elements
  const cardEls = Array.from(wrapper.children).filter((el) => el.classList.contains('swiper-slide'));

  // Table header
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  cardEls.forEach((card) => {
    // --- IMAGE CELL ---
    // Find the <picture> or <img> inside the card
    let imgCell = null;
    const linkWithImage = card.querySelector('a');
    if (linkWithImage) {
      const picture = linkWithImage.querySelector('picture');
      if (picture) {
        // Use the <picture> element directly
        imgCell = picture;
      } else {
        // Fallback: use <img> if present
        const img = linkWithImage.querySelector('img');
        if (img) imgCell = img;
      }
    }

    // --- TEXT CELL ---
    // Find the info container
    const info = card.querySelector('.subLevelCarousel__info');
    let textCellContent = [];
    if (info) {
      // Title: .subLevelCarousel__name
      const titleLink = info.querySelector('.subLevelCarousel__name');
      if (titleLink) {
        // Convert to heading (h3)
        const h3 = document.createElement('h3');
        h3.textContent = titleLink.textContent;
        textCellContent.push(h3);
      }
      // CTA: .cta-white-btn.sub-level-link
      const cta = info.querySelector('.cta-white-btn.sub-level-link');
      if (cta) {
        textCellContent.push(cta);
      }
    }
    // Defensive: If no info, fallback to card text
    if (textCellContent.length === 0) {
      textCellContent.push(card.textContent.trim());
    }

    rows.push([
      imgCell,
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
