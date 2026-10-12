// Contact form (Figma Contact page + Form Field / Form Status components).
// Web3Forms relays submissions without exposing an email address. The access
// key is meant to be client-side; restrict it to the live domain in the
// Web3Forms dashboard.
//
// Behaviour from the Figma annotations: validate on submit, then on blur;
// focus the first invalid field, with errors linked via aria-describedby;
// a Sending state (Send disabled, "Sending…", aria-busy); a status message
// in a live region (role="alert" for the error); clear the form on success
// and keep the values on error.
const WEB3FORMS_ACCESS_KEY = '9d1f6b27-4c09-4bb9-9bed-e0f0e0f1355f';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const messages = {
  name: { missing: 'Enter your name' },
  email: { missing: 'Enter your email address', invalid: 'Enter a valid email address' },
  message: { missing: 'Enter a message' },
};

function validate(field) {
  const value = field.value.trim();
  const rules = messages[field.name];
  if (!value) return rules.missing;
  if (field.name === 'email' && !EMAIL_PATTERN.test(value)) return rules.invalid;
  return '';
}

function showError(field, message) {
  const error = document.getElementById(field.id + '-error');
  if (message) {
    error.textContent = message;
    error.hidden = false;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', error.id);
  } else {
    error.textContent = '';
    error.hidden = true;
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
  }
}

document.querySelectorAll('form[data-contact-form]').forEach((form) => {
  const fields = [...form.querySelectorAll('[data-field]')];
  const submit = form.querySelector('button[type="submit"]');
  const status = document.querySelector('[data-form-status]');
  const submitLabel = submit.textContent;
  let submitted = false;

  const setStatus = (kind, text) => {
    status.hidden = !kind;
    status.dataset.status = kind || '';
    if (kind === 'error') status.setAttribute('role', 'alert');
    else status.removeAttribute('role');
    status.textContent = text || '';
  };

  fields.forEach((field) => {
    field.addEventListener('blur', () => { if (submitted) showError(field, validate(field)); });
    field.addEventListener('input', () => { if (field.getAttribute('aria-invalid')) showError(field, validate(field)); });
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitted = true;
    setStatus(null);

    // Honeypot: bots fill every field, people never see this one.
    const honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot && honeypot.checked) return;

    const invalid = fields.filter((field) => {
      const message = validate(field);
      showError(field, message);
      return Boolean(message);
    });
    if (invalid.length) {
      invalid[0].focus();
      return;
    }

    const data = new FormData(form);
    data.set('access_key', WEB3FORMS_ACCESS_KEY);

    submit.disabled = true;
    submit.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message || 'Submission failed');
      form.reset();
      submitted = false;
      setStatus('sent', "Thanks — I'll get back to you soon.");
    } catch {
      setStatus('error', 'Something went wrong — please try again or email me directly.');
    } finally {
      submit.disabled = false;
      submit.textContent = submitLabel;
      form.removeAttribute('aria-busy');
    }
  });
});
