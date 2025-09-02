/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content div
  let textContentDiv = null;
  const main = element.querySelector('.textBlockB2C__main');
  if (main) {
    const wrap = main.querySelector('.textBlockB2C__wrap');
    if (wrap) {
      const inner = wrap.querySelector('.textBlockB2C__inner');
      if (inner) {
        textContentDiv = inner.querySelector('.textBlockB2C__title');
      }
    }
  }
  if (!textContentDiv) {
    textContentDiv = element.querySelector('.textBlockB2C__title');
  }
  if (!textContentDiv) {
    textContentDiv = element.querySelector('p');
  }

  // Extract the text content as a single string
  let text = '';
  if (textContentDiv) {
    // Try to find a <p> inside, else use textContentDiv's textContent
    const p = textContentDiv.querySelector('p');
    if (p) {
      text = p.textContent.trim();
    } else {
      text = textContentDiv.textContent.trim();
    }
  }

  // Create a heading element for the content row
  const heading = document.createElement('h2');
  heading.textContent = text;

  const headerRow = ['Hero (hero26)'];
  const imageRow = ['']; // No image
  const contentRow = [heading];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
