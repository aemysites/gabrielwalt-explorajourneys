/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main wrapper for the overlapping images and info
  const wrap = element.querySelector('.overlappingImage__wrap');
  if (!wrap) return;

  // Get the images column: all images inside .overlappingImage__images
  const imagesCol = wrap.querySelector('.overlappingImage__images');

  // Get the info column: intro and text inside .overlappingImage__info
  const infoCol = wrap.querySelector('.overlappingImage__info');

  // Defensive: both columns must exist
  if (!imagesCol || !infoCol) return;

  // Table header row
  const headerRow = ['Columns (columns2)'];

  // Table content row: two columns, images and info
  const contentRow = [imagesCol, infoCol];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
