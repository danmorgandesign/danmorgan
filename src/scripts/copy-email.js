// Copy Email Button: the address is assembled at runtime from character codes
// so it never appears as plain text in the page source for scrapers to lift.
const addressCodes = [100, 101, 115, 105, 103, 110, 64, 100, 97, 110, 109, 111, 114, 103, 97, 110, 46, 99, 111, 46, 117, 107];
const address = String.fromCharCode(...addressCodes);
const COPIED_MS = 1500;

function fallbackCopy(text) {
  const tmp = document.createElement('textarea');
  tmp.value = text;
  tmp.setAttribute('readonly', '');
  tmp.className = 'visually-hidden';
  document.body.appendChild(tmp);
  tmp.select();
  try { document.execCommand('copy'); } catch {}
  tmp.remove();
}

document.querySelectorAll('[data-copy-email]').forEach((button) => {
  const label = button.querySelector('[data-copy-email-label]') ?? button;
  label.textContent = address;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address);
    } catch {
      fallbackCopy(address);
    }
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = address; }, COPIED_MS);
  });
});
