/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image or video as required by block spec
  function getMediaCell(mediaWrapper) {
    // Try to find a <picture> (image)
    const picture = mediaWrapper.querySelector('picture');
    if (picture) {
      return picture.cloneNode(true);
    }
    // Try to find a <video> (video)
    const video = mediaWrapper.querySelector('video');
    if (video) {
      // Convert video to a link to its src
      const src = video.querySelector('source')?.getAttribute('src') || video.getAttribute('src');
      if (src) {
        const a = document.createElement('a');
        a.href = src;
        a.textContent = src;
        return a;
      }
    }
    // Fallback: return the wrapper itself
    return mediaWrapper.cloneNode(true);
  }

  // Find the carousel wrapper
  const carousel = element.querySelector('.b2c-2025-carousel__wrapper');
  if (!carousel) return;

  // Get all card columns
  const cardColumns = carousel.querySelectorAll('.b2c-2025-carousel__column');
  if (!cardColumns.length) return;

  // Build header row
  const headerRow = ['Cards (cards21)'];
  const rows = [headerRow];

  // For each card, build a row: [media, text content]
  cardColumns.forEach((col) => {
    // Media cell
    const mediaWrapper = col.querySelector('.b2c-2025-column-image__media');
    const mediaCell = mediaWrapper ? getMediaCell(mediaWrapper) : '';

    // Text cell
    const textWrapper = col.querySelector('.b2c-2025-column-image__text-wrapper');
    const textCellDiv = document.createElement('div');
    if (textWrapper) {
      // Title
      const title = textWrapper.querySelector('.b2c-2025-column-image__title');
      if (title) {
        // Use heading tag if present, else wrap in <strong>
        const titleClone = title.cloneNode(true);
        textCellDiv.appendChild(titleClone);
      }
      // Subtitle/Description
      const subtitle = textWrapper.querySelector('.b2c-2025-column-image__subtitle');
      if (subtitle) {
        const subtitleClone = subtitle.cloneNode(true);
        textCellDiv.appendChild(subtitleClone);
      }
      // CTA button
      const buttonWrapper = textWrapper.querySelector('.b2c-2025-column-image__button');
      if (buttonWrapper) {
        const btn = buttonWrapper.querySelector('a');
        if (btn) {
          const btnClone = btn.cloneNode(true);
          textCellDiv.appendChild(btnClone);
        }
      }
    }
    // Defensive: if no text, use empty string
    const textCell = textCellDiv.childNodes.length ? textCellDiv : '';
    rows.push([mediaCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
