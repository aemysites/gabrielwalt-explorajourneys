/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get the main quick booking wrapper
  const filtersWrapper = element.querySelector('.filtersWrapper.quickBooking');
  if (!filtersWrapper) return;

  // Get the two main filter input columns ("Where?" and "When?")
  const inputContainers = filtersWrapper.querySelectorAll('.filtersWrapper__inputs--container > .filtersWrapper__input');

  // Defensive: ensure we have at least two columns
  if (inputContainers.length < 2) return;

  // Get the "View journeys" button (right column)
  const viewBtn = filtersWrapper.querySelector('.filtersWrapper__button');

  // Extract full block content for each input column
  function extractFullContent(container) {
    // Clone the container to avoid modifying the DOM
    const clone = container.cloneNode(true);
    // Remove all script/style tags
    Array.from(clone.querySelectorAll('script, style')).forEach(el => el.remove());
    // Return the HTML content
    return clone.innerHTML.trim();
  }

  // Compose columns row with full HTML blocks
  const columnsRow = [
    extractFullContent(inputContainers[0]),
    extractFullContent(inputContainers[1]),
    viewBtn ? viewBtn.outerHTML.trim() : ''
  ];

  // Table header row as required
  const headerRow = ['Columns (columns28)'];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
