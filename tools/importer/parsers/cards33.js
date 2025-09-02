/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the first image from the carousel
  function getFirstImageFromCarousel(carousel) {
    // Find the first .swiper-slide that is not a duplicate
    const slides = carousel.querySelectorAll('.swiper-slide');
    for (const slide of slides) {
      if (!slide.classList.contains('swiper-slide-duplicate')) {
        const img = slide.querySelector('img');
        if (img) {
          // If data-src exists, set src
          if (!img.src && img.getAttribute('data-src')) {
            img.src = img.getAttribute('data-src');
          }
          return img;
        }
      }
    }
    // fallback: any image
    const img = carousel.querySelector('img');
    if (img) {
      if (!img.src && img.getAttribute('data-src')) {
        img.src = img.getAttribute('data-src');
      }
      return img;
    }
    return null;
  }

  // Find all highlight cards
  const cards = Array.from(element.querySelectorAll('.highlightRow__card'));
  const rows = [];

  // Table header
  rows.push(['Cards (cards33)']);

  cards.forEach(card => {
    // Image cell
    let imageCell = '';
    const carousel = card.querySelector('.highlightCard__img .carousel-cmp');
    if (carousel) {
      const img = getFirstImageFromCarousel(carousel);
      if (img) {
        imageCell = img;
      }
    }

    // Text cell: title + description
    const info = card.querySelector('.highlightCard__info');
    let textCellContent = [];
    if (info) {
      // Title
      const titleWrap = info.querySelector('.highlightCard__title');
      if (titleWrap) {
        // Use the inner div or p as the heading
        const heading = titleWrap.querySelector('p, div');
        if (heading) {
          // Make it a strong element for semantic heading
          const strong = document.createElement('strong');
          strong.textContent = heading.textContent.trim();
          textCellContent.push(strong);
        }
      }
      // Description
      const desc = info.querySelector('.highlightCard__desc');
      if (desc) {
        // Use the paragraph directly
        const p = desc.querySelector('p');
        if (p) {
          textCellContent.push(document.createElement('br'));
          textCellContent.push(p);
        }
      }
    }
    // Defensive: fallback to card text if above fails
    if (textCellContent.length === 0) {
      textCellContent = [card.textContent.trim()];
    }

    rows.push([
      imageCell,
      textCellContent
    ]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
