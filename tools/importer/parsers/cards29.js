/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content wrapper
  const mainContent = element.querySelector('.carousel-destinations__main_content');
  if (!mainContent) return;

  // Get the carousel slides (cards)
  const slides = mainContent.querySelectorAll('.carousel-destinations__media_carousel__slide');
  if (!slides.length) return;

  // Table header: block name only
  const headerRow = ['Cards (cards29)'];
  const rows = [headerRow];

  // For each card, create a row: [image/icon, text content]
  slides.forEach((slide) => {
    // Image/Icon (first cell)
    let imgEl = slide.querySelector('.carousel-destinations__media_carousel__slide__image picture');
    if (!imgEl) {
      imgEl = slide.querySelector('.carousel-destinations__media_carousel__slide__image img');
    }
    let imgCell = '';
    if (imgEl) imgCell = imgEl.cloneNode(true);

    // Text content (second cell)
    const titleEl = slide.querySelector('.carousel-destinations__media_carousel__slide__title');
    const linkEl = slide.querySelector('a.carousel-destinations__media_carousel__slide__link');
    let textCell = document.createElement('div');
    // Add title as heading (h3)
    if (titleEl) {
      const h3 = document.createElement('h3');
      h3.textContent = titleEl.textContent;
      textCell.appendChild(h3);
    }
    // Add link as CTA if present and not already used for title
    if (linkEl) {
      const a = document.createElement('a');
      a.href = linkEl.href;
      a.title = linkEl.title || (titleEl ? titleEl.textContent : '');
      a.textContent = titleEl ? titleEl.textContent : linkEl.title;
      a.style.display = 'block';
      a.style.marginTop = '8px';
      textCell.appendChild(a);
    }
    rows.push([imgCell, textCell]);
  });

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
