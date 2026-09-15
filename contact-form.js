(function () {
  // Get a free key at https://web3forms.com — it relays submissions to your
  // inbox without ever exposing your email address in the page source.
  var WEB3FORMS_ACCESS_KEY = '9d1f6b27-4c09-4bb9-9bed-e0f0e0f1355f';

  document.querySelectorAll('form[data-contact-form]').forEach(function (form) {
    var status = form.querySelector('[data-form-status]');
    var submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Honeypot: bots fill every field, humans never see or fill this one.
      var honeypot = form.querySelector('input[name="botcheck"]');
      if (honeypot && honeypot.checked) return;

      var formData = new FormData(form);
      formData.set('access_key', WEB3FORMS_ACCESS_KEY);

      submitBtn.disabled = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      status.textContent = '';
      status.classList.remove('text-green-600', 'text-red-600');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
        .then(function (res) { return res.json(); })
        .then(function (result) {
          if (result.success) {
            form.reset();
            status.textContent = "Thanks — I'll get back to you soon.";
            status.classList.add('text-green-600');
          } else {
            throw new Error(result.message || 'Submission failed');
          }
        })
        .catch(function () {
          status.textContent = 'Something went wrong — please try again or email me directly.';
          status.classList.add('text-red-600');
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  });

  // Copy-to-clipboard fallback, address assembled at runtime from character
  // codes so it never appears as plain text for scrapers to lift.
  var addressCodes = [100, 101, 115, 105, 103, 110, 64, 100, 97, 110, 109, 111, 114, 103, 97, 110, 46, 99, 111, 46, 117, 107];
  var address = String.fromCharCode.apply(null, addressCodes);

  function fallbackCopy(text) {
    var tmp = document.createElement('textarea');
    tmp.value = text;
    tmp.style.position = 'fixed';
    tmp.style.opacity = '0';
    document.body.appendChild(tmp);
    tmp.focus();
    tmp.select();
    try { document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(tmp);
  }

  document.querySelectorAll('[data-copy-email]').forEach(function (el) {
    el.textContent = address;

    el.addEventListener('click', function () {
      var copied = navigator.clipboard && navigator.clipboard.writeText
        ? navigator.clipboard.writeText(address)
        : Promise.resolve(fallbackCopy(address));

      copied
        .catch(function () { fallbackCopy(address); })
        .finally(function () {
          el.textContent = 'Copied!';
          setTimeout(function () { el.textContent = address; }, 1500);
        });
    });
  });
})();
