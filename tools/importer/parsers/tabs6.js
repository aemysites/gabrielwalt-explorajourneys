/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Tabs block
  const headerRow = ['Tabs (tabs6)'];

  // Helper to get tab label and content
  function getTabRows(el) {
    const rows = [];
    // Tab 1: Photo View
    const viewMode = el.querySelector('.resultList__toolsBar--viewMode');
    if (viewMode) {
      // Get all buttons (tabs)
      const buttons = Array.from(viewMode.querySelectorAll('button'));
      buttons.forEach((btn) => {
        // Tab label: button text
        const tabLabel = btn.textContent.trim();
        // Tab content: include all text content from the tools bar for context
        const content = document.createElement('div');
        // Use less specific selector to get the full bar's text content
        Array.from(el.childNodes).forEach((node) => {
          content.appendChild(node.cloneNode(true));
        });
        rows.push([tabLabel, content]);
      });
    }
    return rows;
  }

  // Compose table rows
  const tabRows = getTabRows(element);
  // Only keep unique tab labels (avoid duplicate content)
  const seen = new Set();
  const filteredRows = tabRows.filter(([label]) => {
    if (seen.has(label)) return false;
    seen.add(label);
    return true;
  });

  // Build cells array: header + tab rows
  const cells = [headerRow, ...filteredRows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
