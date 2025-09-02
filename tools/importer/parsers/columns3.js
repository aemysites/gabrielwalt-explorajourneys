/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns3)'];

  // Find the three main columns: Where to?, When?, Advanced
  const columns = [];

  // 1. Where to? (get the whole input block for more content)
  const whereCol = element.querySelector('.filtersWrapper__input[data-filter="destinations"]');
  if (whereCol) {
    columns.push(whereCol.cloneNode(true));
  } else {
    columns.push('');
  }

  // 2. When? (get the whole input block for more content)
  const whenCol = element.querySelector('.filtersWrapper__input[data-filter="dates"]');
  if (whenCol) {
    columns.push(whenCol.cloneNode(true));
  } else {
    columns.push('');
  }

  // 3. Advanced (get the whole advanced block)
  const advancedCol = element.querySelector('.filtersWrapper__advanced');
  if (advancedCol) {
    columns.push(advancedCol.cloneNode(true));
  } else {
    columns.push('');
  }

  // Second row: each column's content (as elements)
  const contentRow = columns;

  // Compose table: header row must be a single cell, then content row with three columns
  const cells = [headerRow, contentRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
