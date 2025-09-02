/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get the image element from the card
  function getImageEl(cardEl) {
    // The image is inside .six-section-card__img > a > picture > img
    const imgWrap = cardEl.querySelector('.six-section-card__img');
    if (!imgWrap) return null;
    const picture = imgWrap.querySelector('picture');
    if (!picture) return null;
    const img = picture.querySelector('img');
    if (!img) return null;
    // Try to set the src from the <source> or <picture> data-cmp-src if missing
    if (!img.src) {
      // Try to get the src from the <source> or <picture> attributes
      const source = picture.querySelector('source');
      if (source && source.srcset) {
        img.src = source.srcset.split(',')[0].trim().split(' ')[0];
      } else if (picture.dataset && picture.dataset.cmpSrc) {
        img.src = picture.dataset.cmpSrc.replace('{.width}', '');
      } else if (picture.dataset && picture.dataset.asset) {
        img.src = picture.dataset.asset;
      }
    }
    return img;
  }

  // Helper to get the text content (title, desc, cta) from the card
  function getTextContent(cardEl) {
    const info = cardEl.querySelector('.six-section-card__info');
    if (!info) return null;
    // We'll collect the title, desc, and cta as elements
    const frag = document.createDocumentFragment();
    // Title
    const titleH = info.querySelector('.six-section-card__title');
    if (titleH) {
      // Use the <p> inside <h3> if present
      const p = titleH.querySelector('p');
      if (p) {
        const h = document.createElement('strong');
        h.textContent = p.textContent;
        frag.appendChild(h);
        frag.appendChild(document.createElement('br'));
      }
    }
    // Description
    const descH = info.querySelector('.six-section-card__desc');
    if (descH) {
      const p = descH.querySelector('p');
      if (p) {
        frag.appendChild(document.createTextNode(p.textContent));
        frag.appendChild(document.createElement('br'));
      }
    }
    // CTA
    const cta = info.querySelector('.six-section-card__cta a');
    if (cta) {
      // Add a <br> before CTA if there is other content
      frag.appendChild(document.createElement('br'));
      const ctaLink = document.createElement('a');
      ctaLink.href = cta.getAttribute('data-url-panel') || cta.href;
      ctaLink.textContent = cta.textContent.trim();
      frag.appendChild(ctaLink);
    }
    return frag;
  }

  // Find the card root
  const card = element.querySelector('.six-section-card');
  if (!card) return;

  // Build the table rows
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Card row: [image, text content]
  const imgEl = getImageEl(card);
  const textContent = getTextContent(card);
  rows.push([
    imgEl ? imgEl : '',
    textContent ? textContent : '',
  ]);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
