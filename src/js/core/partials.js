import footerHtml from "/partials/footer.html?raw";

export function injectFooter(selector = "#site-footer") {
  const host = document.querySelector(selector);
  if (!host) return;
  host.innerHTML = footerHtml;
}
