<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
<div>
    <#if section = "form">
        <div id="kc-form">
            <h1 class="custom_container_card_header">${msg("loginAccountTitle")}</h1>

            <#if messagesPerField.existsError('username','password')>
                <div class="custom_container_card_alert_message">
                    <img src="${url.resourcesPath}/img/error.svg" alt="pic" />
                    <span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                        ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                    </span>
                </div>
            </#if>

            <div id="kc-form-wrapper">
                <#if realm.password>
                    <form id="kc-form-login" onsubmit="return validateForm()" action="${url.loginAction}" method="post">
                        <#if !usernameHidden??>
                            <div class="${properties.kcFormGroupClass!} custom_container_card_email_input_container">
                                <label for="username" class="${properties.kcLabelClass!} custom_container_card_email_input_label"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>

                                <div class="custom_container_card_email_input">
                                    <img src="${url.resourcesPath}/img/mail.svg" alt="pic" class="custom_container_card_email_input_icon dark_mode_icon" />
                                    <input placeholder="${msg("emailPlaceholder")}" tabindex="1" id="username" class="${properties.kcInputClass!} custom_container_card_email_input_input" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="username"
                                        aria-invalid="<#if messagesPerField.existsError('password')>true</#if>"
                                    />
                                </div>

                                <span id="email-error" class="${properties.kcInputErrorMessageClass!} custom_container_card_input_error" aria-live="polite"></span>
                            </div>
                        </#if>

                        <div class="${properties.kcFormGroupClass!}">
                            <label for="password" class="${properties.kcLabelClass!} custom_container_card_password_input_label">${msg("password")}</label>

                            <div class="${properties.kcInputGroup!} custom_container_card_password_input_container">
                                <input placeholder="${msg("passwordPlaceholder")}" tabindex="2" id="password" class="${properties.kcInputClass!} custom_container_card_password_input_container_input" name="password" type="password" autocomplete="current-password"
                                       aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"
                                />
                                <button class="${properties.kcFormPasswordVisibilityButtonClass!} custom_container_card_password_input_container_icon" type="button" aria-label="${msg("showPassword")}"
                                        aria-controls="password" data-password-toggle
                                        data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                                        data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                                    <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                                </button>
                            </div>

                            <span id="password-error" class="${properties.kcInputErrorMessageClass!} custom_container_card_input_error" aria-live="polite"></span>
                        </div>

                        <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                            <div id="kc-form-options">
                                <#if realm.rememberMe && !usernameHidden??>
                                    <div class="checkbox">
                                        <label>
                                            <#if login.rememberMe??>
                                                <input id="rememberMe" name="rememberMe" type="checkbox" checked> ${msg("rememberMe")}
                                            <#else>
                                                <input id="rememberMe" name="rememberMe" type="checkbox"> ${msg("rememberMe")}
                                            </#if>
                                        </label>
                                    </div>
                                </#if>
                            </div>
                            <div class="${properties.kcFormOptionsWrapperClass!}">
                                <#if realm.resetPasswordAllowed>
                                    <span><a tabindex="3" href="${url.loginResetCredentialsUrl}" class="custom_container_card_forgot_password">${msg("doForgotPassword")}</a></span>
                                </#if>
                            </div>
                        </div>

                        <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                            <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                            <input tabindex="4"  class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} custom_container_card_Button" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                        </div>
                    </form>
                </#if>
            </div>
        </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span class="custom_container_card_no_account">${msg("noAccount")} <a tabindex="5"
   href="${url.registrationUrl}" class="custom_container_card_no_account_link" id="register_link">${msg("backToRegister")}</a></span>
                </div>
            </div>
        </#if>
    <#elseif section = "socialProviders" >
        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                <div class="custom_container_card_sepatator">
                    <span class="custom_container_card_sepatator_dash"></span>
                    <span class="custom_container_card_sepatator_text">${msg("orSeparator")}</span>
                    <span class="custom_container_card_sepatator_dash"></span>
                </div>

                <h2 class="custom_container_card_identity_label">${msg("identity-provider-login-label")}</h2>

                <div class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if> custom_container_card_social_account_container">
                    <#list social.providers as p>
                        <a id="social-${p.alias}" type="button" href="${p.loginUrl}" class="<#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if> custom_container_card_social_account_container_content <#if p.displayName?lower_case == 'google'>custom_container_card_social_account_container_content_label_google</#if> <#if p.displayName?lower_case == 'github'>custom_container_card_social_account_container_content_label_github</#if>">
                            <div class="custom_container_card_social_account_container_icon_container">
                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                            </div>
                            <h5 class="custom_container_card_social_account_container_content_label">${p.displayName!}</h5>
                        </a>
                    </#list>
                </div>
            </div>
        </#if>
    </#if>
</div>

<script type="module" src="${url.resourcesPath}/js/passwordVisibility.js"></script>
<script type="module">
    function inviteFriend() {
        const urlParams = new URLSearchParams(window.location.search);
        const redirect_uri = urlParams.get('redirect_uri');

        if (redirect_uri.includes('join')) {
            const registerLink = document.getElementById('register_link');
            if (registerLink) {
                registerLink.click();
            }
        }
    };
    inviteFriend();

    const addionnalParams = urlParams.get('user_id') ? '&user_id='+urlParams.get('user_id') : undefined
    window.location.href = url.registrationUrl + addionnalParams

    const svg1 = `
        <svg class="dark_mode_icon" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M9 4.1875C7.4467 4.1875 6.1875 5.4467 6.1875 7C6.1875 8.5533 7.4467 9.8125 9 9.8125C10.5533 9.8125 11.8125 8.5533 11.8125 7C11.8125 5.4467 10.5533 4.1875 9 4.1875ZM7.3125 7C7.3125 6.06802 8.06802 5.3125 9 5.3125C9.93198 5.3125 10.6875 6.06802 10.6875 7C10.6875 7.93198 9.93198 8.6875 9 8.6875C8.06802 8.6875 7.3125 7.93198 7.3125 7Z"
                fill="#778BAA" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M9 0.4375C5.6144 0.4375 3.33397 2.46565 2.01043 4.18515L1.98656 4.21615C1.68723 4.6049 1.41155 4.96294 1.22452 5.3863C1.02423 5.83965 0.9375 6.33377 0.9375 7C0.9375 7.66623 1.02423 8.16035 1.22452 8.6137C1.41155 9.03706 1.68723 9.3951 1.98656 9.78386L2.01043 9.81485C3.33397 11.5344 5.6144 13.5625 9 13.5625C12.3856 13.5625 14.666 11.5344 15.9896 9.81485L16.0134 9.78387C16.3128 9.39511 16.5885 9.03707 16.7755 8.6137C16.9758 8.16035 17.0625 7.66623 17.0625 7C17.0625 6.33377 16.9758 5.83965 16.7755 5.3863C16.5885 4.96293 16.3128 4.60489 16.0134 4.21613L15.9896 4.18515C14.666 2.46565 12.3856 0.4375 9 0.4375ZM2.90191 4.87135C4.12398 3.28369 6.11277 1.5625 9 1.5625C11.8872 1.5625 13.876 3.28369 15.0981 4.87135C15.427 5.29869 15.6197 5.55404 15.7464 5.84091C15.8649 6.10901 15.9375 6.4367 15.9375 7C15.9375 7.5633 15.8649 7.89099 15.7464 8.15909C15.6197 8.44596 15.427 8.70131 15.0981 9.12865C13.876 10.7163 11.8872 12.4375 9 12.4375C6.11277 12.4375 4.12398 10.7163 2.90191 9.12865C2.57298 8.70131 2.3803 8.44596 2.25357 8.15909C2.13513 7.89099 2.0625 7.5633 2.0625 7C2.0625 6.4367 2.13513 6.10901 2.25357 5.84091C2.3803 5.55404 2.57298 5.29869 2.90191 4.87135Z"
                fill="#778BAA" />
        </svg>
    `;

    const svg2 = `
        <svg class="dark_mode_icon" width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 4.1875C7.4467 4.1875 6.1875 5.4467 6.1875 7C6.1875 8.5533 7.4467 9.8125 9 9.8125C10.5533 9.8125 11.8125 8.5533 11.8125 7C11.8125 5.4467 10.5533 4.1875 9 4.1875ZM7.3125 7C7.3125 6.06802 8.06802 5.3125 9 5.3125C9.93198 5.3125 10.6875 6.06802 10.6875 7C10.6875 7.93198 9.93198 8.6875 9 8.6875C8.06802 8.6875 7.3125 7.93198 7.3125 7Z" fill="#778BAA"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0.4375C5.6144 0.4375 3.33397 2.46565 2.01043 4.18515L1.98656 4.21615C1.68723 4.6049 1.41155 4.96294 1.22452 5.3863C1.02423 5.83965 0.9375 6.33377 0.9375 7C0.9375 7.66623 1.02423 8.16035 1.22452 8.6137C1.41155 9.03706 1.68723 9.3951 1.98656 9.78386L2.01043 9.81485C3.33397 11.5344 5.6144 13.5625 9 13.5625C12.3856 13.5625 14.666 11.5344 15.9896 9.81485L16.0134 9.78387C16.3128 9.39511 16.5885 9.03707 16.7755 8.6137C16.9758 8.16035 17.0625 7.66623 17.0625 7C17.0625 6.33377 16.9758 5.83965 16.7755 5.3863C16.5885 4.96293 16.3128 4.60489 16.0134 4.21613L15.9896 4.18515C14.666 2.46565 12.3856 0.4375 9 0.4375ZM2.90191 4.87135C4.12398 3.28369 6.11277 1.5625 9 1.5625C11.8872 1.5625 13.876 3.28369 15.0981 4.87135C15.427 5.29869 15.6197 5.55404 15.7464 5.84091C15.8649 6.10901 15.9375 6.4367 15.9375 7C15.9375 7.5633 15.8649 7.89099 15.7464 8.15909C15.6197 8.44596 15.427 8.70131 15.0981 9.12865C13.876 10.7163 11.8872 12.4375 9 12.4375C6.11277 12.4375 4.12398 10.7163 2.90191 9.12865C2.57298 8.70131 2.3803 8.44596 2.25357 8.15909C2.13513 7.89099 2.0625 7.5633 2.0625 7C2.0625 6.4367 2.13513 6.10901 2.25357 5.84091C2.3803 5.55404 2.57298 5.29869 2.90191 4.87135Z" fill="#778BAA"/>
            <path d="M1 1L17 13" stroke="#778BAA" stroke-width="2" stroke-linecap="round"/>
        </svg>
    `;

    const eye = document.querySelector('.fa.fa-eye');
    eye.remove();

    const eyeSlash = document.querySelector('.fa.fa-eye-slash');
    eye.remove();

    const btn = document.querySelector('.custom_container_card_password_input_container_icon');

    function updateIcon() {
        const currentState = document.querySelector('.custom_container_card_password_input_container_input').type
        const newEye = document.createElement('div');
        newEye.id = 'custom-password-icon';
        newEye.style.display = 'flex';
        newEye.style.justifyContent = 'center';
        newEye.style.alignItems = 'center';

         if (currentState === 'text') {
            newEye.innerHTML = svg1;
        } else if (currentState === 'password') {
            newEye.innerHTML = svg2;
        }

        const existingSvg = document.querySelector('#custom-password-icon');
        if (existingSvg) {
            existingSvg.remove();
        }

        btn.appendChild(newEye);
        console.log(currentState);
    }

    updateIcon();

    btn.addEventListener('click', function() {
        updateIcon();
    });

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('kc-form-login');
        const passwordInput = document.getElementById('password');
        const passwordError = document.getElementById('password-error');
        const emailInput = document.getElementById('username');
        const emailError = document.getElementById('email-error');

        passwordInput.addEventListener('keydown', function(event) {
                passwordError.innerHTML = `<div></div>`;
                passwordInput.parentElement.classList.remove('custom_container_card_input_error_border');
            });

            emailInput.addEventListener('keydown', function(event) {
                emailError.innerHTML = `<div></div>`;
                emailInput.parentElement.classList.remove('custom_container_card_input_error_border');
            });

        form.addEventListener('submit', function(event) {
            passwordError.innerHTML = `<div></div>`;
            emailError.innerHTML = `<div></div>`;
            emailInput.parentElement.classList.remove('custom_container_card_input_error_border');
            passwordInput.parentElement.classList.remove('custom_container_card_input_error_border');

            if (!isValidEmail(emailInput.value)) {
                emailError.innerHTML = `<div style="display: flex; justify-content: flex-start; align-items: center; gap: 4px;">
                    <img src="${url.resourcesPath}/img/validation-error.svg" alt="pic" />
                    ${msg("emailFormatError")}
                </div>`;
                emailInput.parentElement.classList.add('custom_container_card_input_error_border');
                event.preventDefault();
            }

            if (passwordInput.value.length < 8) {
                passwordError.innerHTML = `<div style="display: flex; justify-content: flex-start; align-items: center; gap: 4px;">
                    <img src="${url.resourcesPath}/img/validation-error.svg" alt="pic" />
                    ${msg("passwordLengthError")}
                </div>`;
                passwordInput.parentElement.classList.add('custom_container_card_input_error_border');
                event.preventDefault();
            }
        });

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
    });
</script>
</@layout.registrationLayout>
