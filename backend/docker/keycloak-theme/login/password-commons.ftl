<#macro logoutOtherSessions>
    <div id="kc-form-options" class="${properties.kcFormOptionsClass!}">
        <div class="${properties.kcFormOptionsWrapperClass!}">
            <div class="checkbox">
                <label class='custom_logout_sessions'>
                    <input type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked class='custom_logout_sessions_checkbox'>
                    ${msg("logoutOtherSessions")}
                </label>
            </div>
        </div>
    </div>
</#macro>
