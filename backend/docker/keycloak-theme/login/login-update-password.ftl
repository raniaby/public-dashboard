<#import "template.ftl" as layout>
<#import "password-commons.ftl" as passwordCommons>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "form">
     <img src="${url.resourcesPath}/img/logo.svg" alt="pic" class="custom_container_card_logo" />
            <h1 class="custom_container_card_header">${msg("loginAccountTitle")}</h1>

        <#if messagesPerField.existsError('username','password')>
                <div class="custom_container_card_alert_message">
                    <img src="${url.resourcesPath}/img/error.svg" alt="pic" />
                    <span id="input-error" class="${properties.kcInputErrorMessageClass!}" aria-live="polite">
                        ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                    </span>
                </div>
            </#if>

        <form id="kc-passwd-update-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="password-new" class="${properties.kcLabelClass!} custom_container_card_password_input_label">${msg("passwordNew")}</label>


                    <div class="${properties.kcInputGroup!} custom_container_card_password_input_container">
                        <input placeholder="${msg("passwordPlaceholder")}" tabindex="2" id="password-new" name="password-new" class="${properties.kcInputClass!} custom_container_card_password_input_container_input" type="password" autocomplete="new-password"
                            aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                        />
                        <button class="${properties.kcFormPasswordVisibilityButtonClass!} custom_container_card_password_input_container_icon" type="button" aria-label="${msg("showPassword")}"
                                aria-controls="password-new" data-password-toggle
                                data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                                data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                            <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                        </button>
                    </div>

                    <span id="password-error" class="${properties.kcInputErrorMessageClass!} custom_container_card_input_error" aria-live="polite"></span>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="password-confirm" class="${properties.kcLabelClass!} custom_container_card_password_input_label">${msg("passwordConfirm")}</label>


                    <div class="${properties.kcInputGroup!} custom_container_card_password_input_container">
                        <input placeholder="${msg("passwordPlaceholder")}" tabindex="2" id="password-confirm" name="password-confirm" class="${properties.kcInputClass!} custom_container_card_password_input_container_input" type="password" autocomplete="new-password"
                            aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                        />
                        <button class="${properties.kcFormPasswordVisibilityButtonClass!} custom_container_card_password_input_container_icon" type="button" aria-label="${msg("showPassword")}"
                                aria-controls="password-confirm" data-password-toggle
                                data-icon-show="${properties.kcFormPasswordVisibilityIconShow!}" data-icon-hide="${properties.kcFormPasswordVisibilityIconHide!}"
                                data-label-show="${msg('showPassword')}" data-label-hide="${msg('hidePassword')}">
                            <i class="${properties.kcFormPasswordVisibilityIconShow!}" aria-hidden="true"></i>
                        </button>
                    </div>

                    <span id="password-confirm-error" class="${properties.kcInputErrorMessageClass!} custom_container_card_input_error" aria-live="polite"></span>
                </div>
            </div>

            <div class="${properties.kcFormGroupClass!}">
                <@passwordCommons.logoutOtherSessions/>

                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <#if isAppInitiatedAction??>
                        <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonLargeClass!}" type="submit" value="${msg("doSubmit")}" />
                        <button class="${properties.kcButtonClass!} ${properties.kcButtonDefaultClass!} ${properties.kcButtonLargeClass!}" type="submit" name="cancel-aia" value="true" />${msg("doCancel")}</button>
                    <#else>
                        <div class="${properties.kcLabelWrapperClass!}">
                            <div id="kc-form-buttons" class="${properties.kcFormGroupClass!}">
                                <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                                <input tabindex="4"  class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} custom_container_card_Button" name="login" id="kc-login" type="submit" value="${msg("doSubmit")}"/>
                            </div>
                        </div>
                    </#if>
                </div>
            </div>
        </form>

        <script type="module" src="${url.resourcesPath}/js/passwordVisibility.js"></script>
        <script type="module">
            const form = document.getElementById('kc-passwd-update-form');
            const passwordInput = document.getElementById('password-new');
            const passwordError = document.getElementById('password-error');
            const passwordConfirmInput = document.getElementById('password-confirm');
            const passwordConfirmError = document.getElementById('password-confirm-error');

            passwordInput.addEventListener('keydown', function(event) {
                passwordError.innerHTML = `<div></div>`;
            });

            passwordConfirmInput.addEventListener('keydown', function(event) {
                passwordConfirmError.innerHTML = `<div></div>`;
            });

            form.addEventListener('submit', function(event) {
                passwordError.innerHTML = `<div></div>`;
                passwordInput.parentElement.classList.remove('custom_container_card_input_error_border');

                passwordConfirmError.innerHTML = `<div></div>`;
                passwordConfirmInput.parentElement.classList.remove('custom_container_card_input_error_border');

                if (passwordInput.value.length < 8) {
                    passwordError.innerHTML = `<div style="display: flex; justify-content: flex-start; align-items: center; gap: 4px;">
                        <img src="${url.resourcesPath}/img/validation-error.svg" alt="pic" />
                        ${msg("passwordLengthError")}
                    </div>`;
                    passwordInput.parentElement.classList.add('custom_container_card_input_error_border');
                    event.preventDefault();
                }

                if (passwordInput.value !== passwordConfirmInput.value) {
                    passwordConfirmError.innerHTML = `<div style="display: flex; justify-content: flex-start; align-items: center; gap: 4px;">
                        <img src="${url.resourcesPath}/img/validation-error.svg" alt="pic" />
                         ${msg("notMatchPasswordMessage")}
                    </div>`;
                    passwordConfirmInput.parentElement.classList.add('custom_container_card_input_error_border');
                    event.preventDefault();
                }
            });
        </script>
    </#if>
</@layout.registrationLayout>
