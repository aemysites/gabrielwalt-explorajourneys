/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get absolute URL for images
  function toAbsoluteUrl(src) {
    if (!src) return src;
    const a = document.createElement('a');
    a.href = src;
    return a.href;
  }

  // 1. Table header
  const headerRow = ['Carousel (carousel9)'];
  const rows = [headerRow];

  // 2. Find the main swiper wrapper containing slides
  let mainSwiper = element.querySelector('.main-swiper .swiper-wrapper');
  if (!mainSwiper) {
    // Defensive: fallback to any .swiper-wrapper under main-swiper
    const altMainSwiper = element.querySelector('.main-swiper');
    if (altMainSwiper) {
      const sw = altMainSwiper.querySelector('.swiper-wrapper');
      if (sw) {
        mainSwiper = sw;
      }
    }
  }
  if (!mainSwiper) return;

  // 3. For each .swiper-slide (direct children of mainSwiper)
  const slides = Array.from(mainSwiper.children).filter(child => child.classList.contains('swiper-slide'));

  slides.forEach(slide => {
    // Find the first .decks-carousel-explora--picture-wrapper inside this slide
    const pictureWrapper = slide.querySelector('.decks-carousel-explora--picture-wrapper');
    if (!pictureWrapper) return;

    // Find the first .swiper-zoom-container inside pictureWrapper
    const zoomContainer = pictureWrapper.querySelector('.swiper-zoom-container');
    if (!zoomContainer) return;

    // Prefer the desktop image if present, else mobile
    let img = zoomContainer.querySelector('img.desktop');
    if (!img) {
      img = zoomContainer.querySelector('img.mobile');
    }
    if (!img) return;

    // Create a new <img> referencing the same src and alt, but with absolute URL
    const newImg = document.createElement('img');
    newImg.src = toAbsoluteUrl(img.getAttribute('src'));
    newImg.alt = img.getAttribute('alt') || '';
    if (img.getAttribute('loading')) {
      newImg.setAttribute('loading', img.getAttribute('loading'));
    }
    if (img.getAttribute('width')) newImg.setAttribute('width', img.getAttribute('width'));
    if (img.getAttribute('height')) newImg.setAttribute('height', img.getAttribute('height'));

    // Try to extract any text content from the slide (flexible)
    let textContent = '';
    Array.from(slide.childNodes).forEach(node => {
      if (node !== pictureWrapper && node.nodeType === Node.ELEMENT_NODE) {
        textContent += node.innerText ? node.innerText.trim() + '\n' : '';
      }
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + '\n';
      }
    });
    if (!textContent) {
      Array.from(pictureWrapper.childNodes).forEach(node => {
        if (node !== zoomContainer && node.nodeType === Node.ELEMENT_NODE) {
          textContent += node.innerText ? node.innerText.trim() + '\n' : '';
        }
        if (node.nodeType === Node.TEXT_NODE) {
          textContent += node.textContent.trim() + '\n';
        }
      });
    }
    textContent = textContent.trim();

    // Always push two columns: image and text content (empty string if none)
    rows.push([newImg, textContent || '']);
  });

  // 4. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
