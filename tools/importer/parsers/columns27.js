/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the carousel slide (should only be one)
  const slide = element.querySelector('.carousel-offers__media_carousel__slide');
  if (!slide) return;

  // Column 1: Image
  const imageWrapper = slide.querySelector('.carousel-offers__media_carousel__slide_image');
  let imageContent = null;
  if (imageWrapper) {
    // Use the entire picture element if present
    const picture = imageWrapper.querySelector('picture');
    if (picture) {
      imageContent = picture;
    } else {
      // fallback: any img
      const img = imageWrapper.querySelector('img');
      if (img) imageContent = img;
    }
  }

  // Column 2: Textual content
  const textWrapper = slide.querySelector('.carousel-offers__media_carousel__slide_text');
  let textContent = [];
  if (textWrapper) {
    // Label (e.g., Special Offer)
    const label = textWrapper.querySelector('.carousel-offers__label_item');
    if (label) textContent.push(label);
    // Title
    const title = textWrapper.querySelector('.carousel-offers__slide_title');
    if (title) textContent.push(title);
    // Description
    const desc = textWrapper.querySelector('.carousel-offers__slide_description');
    if (desc) textContent.push(desc);
    // CTA
    const cta = textWrapper.querySelector('.carousel-offers__slide_cta');
    if (cta) textContent.push(cta);
  }

  // Table header
  const headerRow = ['Columns (columns27)'];
  // Table content row: [image, text]
  const contentRow = [imageContent, textContent];

  // Build table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
