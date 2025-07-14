document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('kc-form-login');
  const passwordInput = document.getElementById('password');
  const passwordError = document.getElementById('password-error');
  const emailInput = document.getElementById('username');
  const emailError = document.getElementById('email-error');

  form.addEventListener('submit', function (event) {
    passwordError.innerHTML = `<div></div>`;
    emailError.innerHTML = `<div></div>`;
    emailInput.parentElement.classList.remove(
      'custom_container_card_input_error_border',
    );
    passwordInput.parentElement.classList.remove(
      'custom_container_card_input_error_border',
    );

    if (!isValidEmail(emailInput.value)) {
      emailError.innerHTML = `<div style="display: flex; justify-content: flex-start; align-items: center; gap: 4px;">
              <img src="${url.resourcesPath}/img/validation-error.svg" alt="pic" />
              ${msg('emailFormatError')}
          </div>`;
      emailInput.parentElement.classList.add(
        'custom_container_card_input_error_border',
      );
      event.preventDefault();
    }

    if (passwordInput.value.length < 8) {
      passwordError.innerHTML = `<div style="display: flex; justify-content: flex-start; align-items: center; gap: 4px;">
              <img src="${url.resourcesPath}/img/validation-error.svg" alt="pic" />
              ${msg('passwordLengthError')}
          </div>`;
      passwordInput.parentElement.classList.add(
        'custom_container_card_input_error_border',
      );
      event.preventDefault();
    }
  });

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});
