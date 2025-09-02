/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card container
  const itemsContainer = element.querySelector('.journeys-highlights__content__items');
  if (!itemsContainer) return;

  // Table header row
  const headerRow = ['Cards (cards8)'];
  const rows = [headerRow];

  // Get all card slides
  const slides = Array.from(itemsContainer.querySelectorAll(':scope > .journeys-highlights__content__items__slide'));

  slides.forEach((slide) => {
    // Image cell: find the <picture> element
    const imageWrapper = slide.querySelector('.journeys-highlights__content__items__slide__image');
    let imageEl = null;
    if (imageWrapper) {
      imageEl = imageWrapper.querySelector('picture') || imageWrapper.querySelector('img');
    }

    // Text cell: title, description, CTA
    const textCellContent = [];

    // Title/Description
    const textWrapper = slide.querySelector('.journeys-highlights__content__items__slide__text-wrapper');
    if (textWrapper) {
      // The title is inside .journeys-highlights__content__items__slide__title
      const titleDiv = textWrapper.querySelector('.journeys-highlights__content__items__slide__title');
      if (titleDiv) {
        // Use the whole div for resilience
        textCellContent.push(titleDiv);
      }
    }

    // CTA button (optional)
    const buttonWrapper = slide.querySelector('.journeys-highlights__content__items__slide__button');
    if (buttonWrapper) {
      const btnLeft = buttonWrapper.querySelector('.btn--left');
      if (btnLeft) {
        const link = btnLeft.querySelector('a');
        if (link) {
          textCellContent.push(link);
        }
      }
    }

    // Build the row: image in first cell, text content in second cell
    rows.push([
      imageEl,
      textCellContent
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
