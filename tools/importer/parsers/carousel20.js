/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main highlight card wrapper
  const cardWrap = element.querySelector('.highlightCard__wrap');
  if (!cardWrap) return;

  // Get the info (title, description, etc.)
  const info = cardWrap.querySelector('.highlightCard__info');
  let textContent = [];
  if (info) {
    // Title
    const title = info.querySelector('.highlightCard__title');
    if (title) {
      // Use heading for title if possible
      const heading = document.createElement('h2');
      // Find the first <p> inside title
      const titleP = title.querySelector('p');
      if (titleP) {
        heading.innerHTML = titleP.innerHTML;
        textContent.push(heading);
      }
    }
    // Description and list
    const desc = info.querySelector('.highlightCard__desc');
    if (desc) {
      // Push all children of desc (paragraphs, lists)
      Array.from(desc.children).forEach(child => {
        textContent.push(child);
      });
    }
  }

  // Find carousel slides
  const carousel = cardWrap.querySelector('.highlightCard__img [data-dynamic-name="carousel-cmp"]');
  if (!carousel) return;
  const slides = carousel.querySelectorAll('.carousel__slider__slide');

  // Defensive: filter out duplicate slides (swiper duplicates)
  // Only keep slides with unique image src
  const seenSrcs = new Set();
  const uniqueSlides = [];
  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if (img) {
      // Prefer src if present, else data-src
      const src = img.getAttribute('src') || img.getAttribute('data-src');
      if (src && !seenSrcs.has(src)) {
        seenSrcs.add(src);
        uniqueSlides.push(slide);
      }
    }
  });

  // Build table rows
  const headerRow = ['Carousel (carousel20)'];
  const rows = [headerRow];

  uniqueSlides.forEach((slide, idx) => {
    // Get image element
    const imgDiv = slide.querySelector('.carousel__slider__slide--image');
    let imgEl = null;
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) {
        imgEl = img;
      }
    }
    // First cell: image (mandatory)
    // Second cell: text (only for first slide)
    if (imgEl) {
      if (idx === 0 && textContent.length) {
        rows.push([imgEl, textContent]);
      } else {
        rows.push([imgEl, '']);
      }
    }
  });

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
