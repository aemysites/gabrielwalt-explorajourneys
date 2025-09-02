/* global WebImporter */
export default function parse(element, { document }) {
  // Find the wrapper for the columns
  const wrapper = element.querySelector('.b2c-2025-inclusions__wrapper');
  if (!wrapper) return;

  // Get the two main columns (text and image/video)
  const columns = wrapper.querySelectorAll(':scope > .b2c-2025-inclusions__column');
  if (columns.length < 2) return;

  // --- First column: text ---
  const textCol = columns[0];
  // Collect all relevant children (title, list, disclaimer)
  const textContent = [];
  // Title
  const title = textCol.querySelector('.b2c-2025-inclusions__title');
  if (title) textContent.push(title);
  // List
  const list = textCol.querySelector('.b2c-2025-inclusions__list');
  if (list) textContent.push(list);
  // Disclaimer
  const disclaimer = textCol.querySelector('.b2c-2025-inclusions__disclaimer');
  if (disclaimer) textContent.push(disclaimer);

  // --- Second column: image or video ---
  const mediaCol = columns[1];
  let mediaContent = [];
  // Try to find an image
  const img = mediaCol.querySelector('img');
  if (img) {
    mediaContent = [img];
  } else {
    // If not image, check for video
    const video = mediaCol.querySelector('video');
    if (video) {
      // Use poster if available, else fallback to a link to the video src
      const poster = video.getAttribute('poster');
      if (poster) {
        const imageEl = document.createElement('img');
        imageEl.src = poster;
        mediaContent = [imageEl];
      } else {
        // Use the first source as a link
        const srcEl = video.querySelector('source');
        if (srcEl && srcEl.src) {
          const link = document.createElement('a');
          link.href = srcEl.src;
          link.textContent = srcEl.src;
          mediaContent = [link];
        }
      }
    }
  }
  // If no image or video, fallback to any content in the media column
  if (mediaContent.length === 0) {
    mediaContent = Array.from(mediaCol.childNodes).filter(n => n.nodeType === 1);
  }

  // --- Table construction ---
  const headerRow = ['Columns (columns24)'];
  const contentRow = [textContent, mediaContent];
  const cells = [headerRow, contentRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
