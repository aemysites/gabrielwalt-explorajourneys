/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the first image from a card
  function getCardImage(card) {
    // Find the first img inside .searchCard__img
    const imgContainer = card.querySelector('.searchCard__img');
    if (!imgContainer) return null;
    const img = imgContainer.querySelector('img');
    return img || null;
  }

  // Helper to extract the text content for the card
  function getCardText(card) {
    const content = card.querySelector('.searchCard__content');
    if (!content) return document.createElement('div');
    const textContainer = document.createElement('div');
    textContainer.style.display = 'flex';
    textContainer.style.flexDirection = 'column';

    // Title
    const titleDiv = content.querySelector('.title span');
    if (titleDiv) {
      const titleEl = document.createElement('h3');
      titleEl.textContent = titleDiv.textContent;
      textContainer.appendChild(titleEl);
    }

    // From/To
    const fromTo = content.querySelector('.fromTo');
    if (fromTo) {
      // We'll combine both from and to into a single line, similar to the visual
      const from = fromTo.querySelector('.fromTo__from');
      const to = fromTo.querySelector('.fromTo__to');
      const separator = fromTo.querySelector('.separator');
      const fromToLine = document.createElement('div');
      fromToLine.style.display = 'flex';
      fromToLine.style.alignItems = 'center';
      if (from) {
        fromToLine.appendChild(from.cloneNode(true));
      }
      if (separator) {
        fromToLine.appendChild(separator.cloneNode(true));
      }
      if (to) {
        fromToLine.appendChild(to.cloneNode(true));
      }
      textContainer.appendChild(fromToLine);
    }

    // Price and nights
    const pricesNights = content.querySelector('.pricesNights');
    if (pricesNights) {
      const priceDiv = pricesNights.querySelector('.pricesNights__prices');
      const nightsDiv = pricesNights.querySelector('.pricesNights__nights');
      const priceNightsLine = document.createElement('div');
      priceNightsLine.style.display = 'flex';
      priceNightsLine.style.justifyContent = 'space-between';
      priceNightsLine.style.alignItems = 'center';
      if (priceDiv) {
        priceNightsLine.appendChild(priceDiv.cloneNode(true));
      }
      if (nightsDiv) {
        priceNightsLine.appendChild(nightsDiv.cloneNode(true));
      }
      textContainer.appendChild(priceNightsLine);
    }

    // CTA button
    const buttonContainer = content.querySelector('.button__container');
    if (buttonContainer) {
      const cta = buttonContainer.querySelector('a');
      if (cta) {
        textContainer.appendChild(cta.cloneNode(true));
      }
    }

    return textContainer;
  }

  // Get all cards
  const cards = Array.from(element.querySelectorAll(':scope > .searchCard'));
  const rows = [];
  const headerRow = ['Cards (cards7)'];
  rows.push(headerRow);

  cards.forEach((card) => {
    const img = getCardImage(card);
    const text = getCardText(card);
    rows.push([img, text]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
