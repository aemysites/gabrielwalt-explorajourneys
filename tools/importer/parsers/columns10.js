/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the main wrapper for the block content
  const wrapper = element.querySelector('.inline-brochure__wrapper') || element;

  // Get the two main columns: image and text
  // Defensive: Use :scope > div to get direct children
  let imageCol, textCol;
  const content = wrapper.querySelector('.inline-brochure__content');
  if (content) {
    const children = content.querySelectorAll(':scope > div');
    // Usually: [image, text-content]
    imageCol = children[0];
    textCol = children[1];
  } else {
    // Fallback: try to find by class
    imageCol = wrapper.querySelector('.inline-brochure__content__image');
    textCol = wrapper.querySelector('.inline-brochure__content__text-content');
  }

  // Defensive: If not found, create empty divs
  if (!imageCol) {
    imageCol = document.createElement('div');
  }
  if (!textCol) {
    textCol = document.createElement('div');
  }

  // Table header row
  const headerRow = ['Columns (columns10)'];
  // Table content row: two columns side by side
  const contentRow = [imageCol, textCol];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
