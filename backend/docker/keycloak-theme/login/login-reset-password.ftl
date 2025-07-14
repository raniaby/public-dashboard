<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "form">
        <form id="kc-reset-password-form" onsubmit="return validateForm()" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <h1 class="custom_container_card_header">${msg("emailForgotTitle")}</h1>
            <p class="custom_container_card_header_subtitle">${msg("emailForgotSubTitle")}</p>

            <div class="${properties.kcFormGroupClass!} custom_container_card_email_input_container">
                <div class="${properties.kcLabelWrapperClass!}">
                    <label for="username" class="${properties.kcLabelClass!} custom_container_card_email_input_label"><#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if></label>
                </div>
                <div class="${properties.kcInputWrapperClass!}">
                    <div class="custom_container_card_email_input">
                        <img src="${url.resourcesPath}/img/mail.svg" alt="pic" class="custom_container_card_email_input_icon dark_mode_icon" />
                        <input placeholder="${msg("emailPlaceholder")}" tabindex="2" id="username" class="${properties.kcInputClass!} custom_container_card_email_input_input" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="username"
                            aria-invalid="<#if messagesPerField.existsError('password')>true</#if>"
                        />
                    </div>
                </div>
                <div class="${properties.kcLabelWrapperClass!}">
                    <span id="email-error" class="${properties.kcInputErrorMessageClass!} custom_container_card_input_error" aria-live="polite"></span>
                </div>
            </div>


            <div class="${properties.kcFormGroupClass!} ${properties.kcFormSettingClass!}">
                <div id="kc-form-buttons" class="${properties.kcFormButtonsClass!}">
                    <input class="${properties.kcButtonClass!} ${properties.kcButtonPrimaryClass!} ${properties.kcButtonBlockClass!} ${properties.kcButtonLargeClass!} custom_container_card_Button" type="submit" value="${msg("doSubmit")}"/>
                </div>

                <div id="kc-form-options" class="${properties.kcFormOptionsClass!} custom_container_card_header_forgot_link">
                    <div class="${properties.kcFormOptionsWrapperClass!}">
                        <span><a class="custom_container_card_header_forgot_link_a" href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
                    </div>
                </div>
            </div>
        </form>
    <#elseif section = "info" >
        <#if realm.duplicateEmailsAllowed>
            ${msg("emailInstructionUsername")}
        </#if>
    </#if>

<script type="module">
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('kc-reset-password-form');
        const emailInput = document.getElementById('username');
        const emailError = document.getElementById('email-error');

        form.addEventListener('submit', function(event) {
            emailError.innerHTML = `<div></div>`;
            emailInput.parentElement.classList.remove('custom_container_card_input_error_border');

            if (!isValidEmail(emailInput.value)) {
                emailError.innerHTML = `<div style="display: flex; justify-content: flex-start; align-items: center; gap: 4px;">
                    <img src="${url.resourcesPath}/img/validation-error.svg" alt="pic" />
                    ${msg("emailFormatError")}
                </div>`;
                emailInput.parentElement.classList.add('custom_container_card_input_error_border');
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
