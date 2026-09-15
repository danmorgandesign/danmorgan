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
})();
